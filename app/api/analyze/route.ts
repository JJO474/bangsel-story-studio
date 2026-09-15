import {NextResponse} from "next/server";

const cutProperties={
  start:{type:"number"},end:{type:"number"},scene:{type:"string"},emotion:{type:"string"},
  dialogue:{type:"string"},set:{type:"string"},acting:{type:"string"},camera:{type:"string"},
  light:{type:"string"},props:{type:"string"},warudo:{type:"string"}
};

export async function POST(request:Request){
  const apiKey=process.env.OPENAI_API_KEY;
  if(!apiKey)return NextResponse.json({error:"AI 서버 키가 아직 등록되지 않았습니다."},{status:503});
  try{
    const body=await request.json() as {frames?:string[];duration?:number;fileName?:string};
    if(!body.frames?.length)return NextResponse.json({error:"분석할 영상 프레임이 없습니다."},{status:400});
    if(body.frames.length>10)return NextResponse.json({error:"대표 프레임은 최대 10장까지 분석할 수 있습니다."},{status:400});
    const content:any[]=[{type:"input_text",text:`파일명: ${body.fileName||"알 수 없음"}\n영상 길이: ${body.duration||0}초\n프레임은 시간순이다. 원본 드라마/영화 장면과 메이킹·예능·광고 부분을 구분하고, 원본 장면만 시간 흐름에 따라 정확히 4컷으로 분석하라. 화면에 보이는 사실만 기록하고 불확실한 대사는 '확인 필요'라고 쓴다. 각 컷에 Warudo 재촬영 지시를 구체적으로 작성하라.`}];
    body.frames.forEach((image_url,i)=>{content.push({type:"input_text",text:`대표 프레임 ${i+1}/${body.frames!.length}`});content.push({type:"input_image",image_url,detail:"high"})});
    const response=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${apiKey}`},
      body:JSON.stringify({model:"gpt-6-astra",input:[{role:"system",content:"당신은 영상 콘티와 Warudo 3D 촬영을 분석하는 한국어 감독이다. 패러디하지 말고 업로드된 원본 장면의 화면 정보에만 근거한다."},{role:"user",content}],text:{format:{type:"json_schema",name:"scene_analysis",strict:true,schema:{type:"object",additionalProperties:false,properties:{workTitle:{type:"string"},sceneTitle:{type:"string"},summary:{type:"string"},mainStart:{type:"number"},mainEnd:{type:"number"},excludedNote:{type:"string"},cuts:{type:"array",minItems:4,maxItems:4,items:{type:"object",additionalProperties:false,properties:cutProperties,required:Object.keys(cutProperties)}}},required:["workTitle","sceneTitle","summary","mainStart","mainEnd","excludedNote","cuts"]}}},max_output_tokens:4000})
    });
    const data:any=await response.json();
    if(!response.ok)return NextResponse.json({error:data?.error?.message||"OpenAI 분석 요청에 실패했습니다."},{status:response.status});
    const text=data.output?.flatMap((x:any)=>x.content||[]).find((x:any)=>x.type==="output_text")?.text;
    if(!text)return NextResponse.json({error:"분석 결과가 비어 있습니다."},{status:502});
    return NextResponse.json({analysis:JSON.parse(text)});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"영상 분석 중 오류가 발생했습니다."},{status:500})}
}
