"use client";
import {useRef,useState} from "react";
import {BadgeCheck,Camera,ChevronRight,CircleStop,Clapperboard,Copy,FileVideo,Lightbulb,Mic,Play,Save,Sparkles,Trash2,Upload,UserRound,Volume2} from "lucide-react";
type Cut={scene:string;emotion:string;set:string;acting:string;camera:string;light:string;props:string};
type Work={category:string;title:string;scene:string;status:string;cuts:Cut[]};
type AnalysisCut=Cut&{start:number;end:number;dialogue:string;warudo:string};
type Analysis={workTitle:string;sceneTitle:string;summary:string;mainStart:number;mainEnd:number;excludedNote:string;cuts:AnalysisCut[]};
const cut=(scene:string,emotion:string,set:string,acting:string,camera:string,light:string,props:string):Cut=>({scene,emotion,set,acting,camera,light,props});
const W:Work[]=[
 {category:"한국 영화",title:"늑대의 유혹",scene:"비 오는 거리, 우산 아래의 첫 만남",status:"장면 확인",cuts:[
  cut("비 내리는 거리에서 여주인공이 혼자 우산을 쓰고 걷는다.","낯선 만남 직전의 긴장","젖은 야간 거리·횡단보도","우산을 낮게 들고 천천히 걷기","정면 추적 중간 화면·35mm","청록 배경광·부드러운 흰 얼굴빛","투명 우산·빗물 반사"),
  cut("남주인공이 달려와 우산 아래로 몸을 숙여 들어온다.","갑작스러운 합류의 놀람","같은 거리·우산 안쪽","숨찬 미소 / 눈을 크게 뜨고 반걸음 물러남","우산 안 투샷·50mm","왼쪽 뒤 가로등 테두리광","우산 손잡이·비 입자"),
  cut("남주인공이 우산을 들어 올리며 얼굴을 드러낸다.","서로를 선명하게 인식","배경을 흐린 빗길","손을 올리고 눈을 맞춘 뒤 미소","가슴 위 근접·70mm·느린 밀어가기","눈동자 흰 반사광","우산 가장자리·젖은 머리"),
  cut("두 사람이 한 우산 아래 나란히 걷기 시작한다.","말보다 행동으로 남는 설렘","긴 거리·반사 도로","어깨 간격을 좁히고 마지막에 짧게 마주보기","뒤 넓은 화면→옆모습","연보라 간판빛·청록 바닥 반사","우산·빗방울·접촉 그림자")]},
 {category:"한국 영화",title:"타짜",scene:"고니와 아귀의 마지막 승부",status:"장면 확인",cuts:[
  cut("두 사람이 패를 사이에 두고 마주 앉는다.","물러설 수 없는 대결","낡은 실내 도박판","상체를 고정하고 눈과 손끝만 움직이기","탁자 높이 대칭 투샷·50mm","위쪽 단일등·강한 그림자","화투패·낮은 탁자·현금"),
  cut("상대가 승부 조건을 밀어붙이고 고니가 받아들인다.","허세와 냉정함의 충돌","탁자 중앙 강조","턱을 들어 압박 / 시선 고정하고 숨 고르기","교대 얼굴 근접·85mm","탁자 위 따뜻한 점광","패·담배 연기"),
  cut("패가 공개되기 직전 손들이 멈춘다.","결과 직전의 정적","손과 패만 보이는 공간","손가락 미세 떨림·반대 손 주먹","수직 내려다보기→손 근접","패 위 집중광","화투패·망치 실루엣"),
  cut("승부가 뒤집히며 두 사람의 표정이 갈린다.","확신과 붕괴","어두운 방 전체","작게 숨 내쉬기 / 몸을 앞으로 무너뜨리기","두 얼굴 빠른 교대","승자 쪽 청록 테두리광","흩어진 패·접촉 그림자")]},
 {category:"한국 드라마",title:"도깨비",scene:"첫눈 속, 소환에 응답한 만남",status:"일부 확인",cuts:[
  cut("눈 내리는 밤, 여주인공이 작은 불꽃을 끈다.","기대와 의심","겨울 골목·낮은 담장","두 손을 모아 불꽃을 끄고 기다리기","옆모습 중간 화면·50mm","푸른 달빛·주황 보조광","작은 불꽃·목도리·눈"),
  cut("눈발 너머에서 남주인공이 나타난다.","현실에 들어온 환상","골목 원경·눈 안개","코트 자락과 함께 느리게 걸어오기","낮은 넓은 화면·35mm","강한 흰 역광","긴 코트·눈·안개"),
  cut("가까운 거리에서 서로의 존재를 확인한다.","놀람 뒤 호기심","배경 보케","반신반의 / 무심한 듯 부드러운 눈빛","교대 어깨너머·70mm","차가운 얼굴 소프트광","목도리·코트"),
  cut("눈이 쌓이는 동안 조용히 마주 선다.","운명 같은 여운","하얀 골목 전체","동작을 줄이고 마지막에 작은 미소","뒤로 빠지는 넓은 화면","연보라 하늘빛·눈 반사","발자국·접촉 그림자")]},
 {category:"한국 드라마",title:"더 글로리",scene:"복수를 선언하는 차가운 대면",status:"일부 확인",cuts:[
  cut("주인공이 정돈된 공간에 들어와 상대와 거리를 둔다.","오래 준비한 대면","차가운 실내·큰 창","등을 곧게 펴고 감정을 숨기기","문에서 따라가는 중간 화면","회청색 창빛","서류 봉투·의자"),
  cut("준비한 사실을 차분히 하나씩 꺼낸다.","절제된 분노와 통제","테이블 사이 대치","눈을 피하지 않고 손을 천천히 움직임","정면 근접·70mm","한쪽 얼굴 측면광","사진·봉투·휴대전화"),
  cut("상대가 동요하지만 주인공은 침묵한다.","힘의 균형 변화","어두워지는 배경","입술 굳힘 / 거의 움직이지 않음","상대 근접→주인공 고정","상대 쪽 빛 감소","구겨진 종이·유리 반사"),
  cut("다음 수를 암시하고 먼저 자리를 떠난다.","끝나지 않은 복수","긴 복도·문 프레임","뒤돌아보지 않고 걸어 나가기","고정 넓은 화면","뒤쪽 청록 테두리광","문·긴 그림자")]},
 {category:"전래 고전",title:"심청전",scene:"심청과 눈을 뜬 아버지의 재회",status:"고전 확인",cuts:[
  cut("궁중 잔치에서 심청이 아버지를 찾는다.","기다림 끝의 간절함","전통 궁궐 연회장","두 손을 모으고 사람들을 살피기","넓은 화면→중간 화면","금빛 등불·청록 달빛","한복·연회상·등"),
  cut("심 봉사가 딸의 목소리를 듣고 돌아선다.","믿기 힘든 목소리","연회장 입구","지팡이를 짚고 소리 방향 찾기","가슴 위 화면·70mm","따뜻한 정면광","지팡이·도포"),
  cut("두 사람이 서로를 알아보고 손을 맞잡는다.","그리움의 폭발","둘 사이 빈 공간","소매를 잡고 얼굴을 더듬어 확인","옆면 투샷·50mm","부드러운 흰빛","한복 소매·접촉 그림자"),
  cut("아버지가 눈을 뜨고 심청의 얼굴을 본다.","희생이 보상받는 절정","밝게 흐린 궁궐","눈을 천천히 뜬 뒤 서로 안기기","눈 근접→넓은 화면","밝아지는 금백색 역광","꽃잎·지팡이")]},
 {category:"전래 고전",title:"춘향전",scene:"광한루의 첫 만남",status:"고전 확인",cuts:[
  cut("몽룡이 그네 타는 춘향을 발견한다.","첫눈의 설렘","광한루·꽃 정원","그네 타기 / 걸음을 멈추기","정원 넓은 화면·35mm","맑은 낮빛","그네·부채·꽃잎"),
  cut("그네가 다가오며 두 사람의 시선이 만난다.","시간이 느려지는 순간","그네 앞 꽃길","정점에서 고개를 돌려 눈맞춤","몽룡 시점 느린 화면·70mm","부드러운 흰 얼굴빛","한복 자락·그네 줄"),
  cut("몽룡이 예를 갖춰 인사하고 춘향이 답한다.","호기심과 예의","정자 옆 평지","한 걸음 거리와 가벼운 목례","허리 위 투샷·50mm","따뜻한 측면광","부채·노리개"),
  cut("둘이 꽃길을 걷고 그네가 멈춘다.","새 관계의 여운","꽃길·광한루 원경","속도를 맞추되 손은 닿지 않게","뒤 추적 넓은 화면","연보라 노을빛","꽃잎·긴 그림자")]},
 {category:"애니메이션",title:"원피스",scene:"샹크스가 루피에게 밀짚모자를 맡기는 약속",status:"일부 확인",cuts:[
  cut("어린 루피가 떠나는 샹크스를 붙잡는다.","이별을 부정하는 마음","목조 항구·노을 바다","주먹을 쥐고 올려다보기 / 무릎 낮추기","옆면 중간 화면","주황 노을·청록 반사","밀짚모자·배·밧줄"),
  cut("샹크스가 모자를 벗어 루피에게 씌운다.","신뢰를 물건으로 전달","흐린 항구","모자를 내리고 손을 잠시 얹기","손 근접→얼굴","따뜻한 테두리광","밀짚모자·바람"),
  cut("루피가 눈물을 참으며 약속을 받아들인다.","슬픔이 목표로 변화","바다 수평선","숙였다가 굳은 눈빛으로 들기","낮은 얼굴 근접·70mm","눈물 반사·노을광","모자 끈·눈물"),
  cut("배가 떠나고 루피가 항구 끝에서 모자를 붙잡는다.","재회의 다짐","넓은 바다·멀어지는 배","한 손으로 모자, 다른 손 높이 들기","등 뒤 초광각·28mm","노을 실루엣","배·갈매기·바람")]},
 {category:"애니메이션",title:"나루토",scene:"이루카가 나루토를 인정하고 보호대를 건네는 밤",status:"일부 확인",cuts:[
  cut("지친 나루토가 숲에서 고개를 숙인다.","외로움과 실패감","달빛 숲","어깨를 떨어뜨리고 무릎 위에 손","높은 중간 화면·50mm","푸른 달빛","두루마리·흙먼지"),
  cut("부상당한 이루카가 앞에 무릎을 꿇는다.","같은 눈높이의 위로","숲 빈터","아픈 몸으로 미소 / 놀라 고개 들기","옆면 투샷·50mm","사이의 따뜻한 보조광","보호대·상처"),
  cut("이루카가 보호대를 풀어 건넨다.","온전한 인정","흐린 숲 배경","두 손으로 건네고 조심스럽게 받기","손 근접→두 얼굴","금속판 반사광","이마 보호대·두루마리"),
  cut("나루토가 보호대를 매고 환하게 웃는다.","소속감과 출발","달빛이 트인 숲","보호대를 만지고 눈물 속 웃기","정면 화면→위로 이동","청록 달빛·따뜻한 얼굴광","보호대·나뭇잎")]},
 {category:"외국 영화",title:"레옹",scene:"마틸다가 화분을 땅에 심는 마지막 장면",status:"장면 확인",cuts:[
  cut("마틸다가 화분을 안고 학교 정원으로 걷는다.","상실 뒤의 책임","조용한 학교 정원","화분을 가슴에 안고 천천히 걷기","뒤 추적 중간 화면·50mm","흐린 낮빛","화분·작은 삽"),
  cut("나무 아래 무릎을 꿇고 흙을 판다.","삶에 자리를 만들기","큰 나무 뿌리 옆","손으로 흙을 고르고 구멍 만들기","옆면 낮은 화면","나뭇잎 사이 점광","삽·흙·화분"),
  cut("식물을 화분에서 꺼내 땅에 심는다.","뿌리내림의 상징","흙과 손 중심","뿌리를 감싸고 흙을 눌러주기","손과 뿌리 초근접·85mm","따뜻한 집중광","식물·흙·물병"),
  cut("심은 식물 옆에 앉아 바라본다.","슬픔 속 이어지는 삶","정원 전체","숨을 고르고 먼 곳 바라보기","식물 앞 낮은 넓은 화면","연초록 반사·역광","식물·낙엽")]},
 {category:"외국 영화",title:"타이타닉",scene:"선수에서 바람을 맞는 두 사람",status:"장면 확인",cuts:[
  cut("잭이 로즈를 배의 선수 끝으로 안내한다.","두려움에서 자유로","선박 선수·넓은 바다","한 걸음 뒤 안내 / 난간 잡기","옆면 전신·35mm","금빛 노을·푸른 반사","난간·바람"),
  cut("로즈가 눈을 감고 두 팔을 펼친다.","자유를 처음 느낌","수평선과 하늘","가슴을 펴고 긴장부터 미소까지","정면 허리 위·50mm","따뜻한 노을빛","난간·바람"),
  cut("잭이 뒤에서 받쳐 주고 같은 방향을 본다.","깊어지는 신뢰","선수 끝·바다","두 인물 중심축 맞추기","옆모습 근접 투샷·70mm","연보라 테두리광","난간·머리카락 바람"),
  cut("카메라가 뒤로 빠져 바다 위 두 사람을 보여준다.","짧고 찬란한 기억","선박 선수 전체","자세 유지 후 짧게 마주보기","28mm 후진 이동","노을→푸른 저녁","바다 안개·수면 반사")]}
];
const nav=["인물 설정","명장면 자료실","원본 4컷","와루도 촬영","음성·완성"];
export default function Studio(){
 const [page,setPage]=useState(1),[idx,setIdx]=useState(0),[name,setName]=useState("루미"),[fan,setFan]=useState("JW"),[tone,setTone]=useState("다정하고 장난기 있는 반말"),[fanCall,setFanCall]=useState("우리 팬"),[memory,setMemory]=useState("비 오는 날에도 빠지지 않은 방송 출석"),[request,setRequest]=useState("따뜻한 감사와 다음 만남 약속"),[videoName,setVideoName]=useState(""),[videoUrl,setVideoUrl]=useState(""),[videoFile,setVideoFile]=useState<File|null>(null),[analysis,setAnalysis]=useState<Analysis|null>(null),[analyzing,setAnalyzing]=useState(false),[analysisError,setAnalysisError]=useState(""),[lines,setLines]=useState(W[0].cuts.map((x,i)=>`${i+1}컷 대사 메모: ${x.emotion}이 드러나는 짧은 대사를 영상에서 확인해 입력하세요.`)),[audio,setAudio]=useState<Record<number,string>>({}),[rec,setRec]=useState<number|null>(null),[toast,setToast]=useState(""); const recorder=useRef<MediaRecorder|null>(null),chunks=useRef<Blob[]>([]),base=W[idx],w:Work=analysis?{category:"영상 분석",title:analysis.workTitle||videoName,scene:analysis.sceneTitle,status:"AI 분석 완료",cuts:analysis.cuts}:base;
 const note=(x:string)=>{setToast(x);setTimeout(()=>setToast(""),1800)}, choose=(i:number)=>{setAnalysis(null);setIdx(i);setLines(W[i].cuts.map((x,n)=>`${n+1}컷 대사 메모: ${x.emotion}이 드러나는 짧은 대사를 영상에서 확인해 입력하세요.`))}, save=()=>{localStorage.setItem("bangsel-ten",JSON.stringify({name,fan,tone,fanCall,memory,request,idx,lines,analysis}));note("현재 기기에 저장했습니다.")};
 function video(e:React.ChangeEvent<HTMLInputElement>){const f=e.target.files?.[0];if(!f)return;if(f.size>80*1024*1024){note("테스트 영상은 80MB 이하만 사용할 수 있습니다.");return}if(videoUrl)URL.revokeObjectURL(videoUrl);setVideoFile(f);setVideoName(f.name);setVideoUrl(URL.createObjectURL(f));setAnalysis(null);setAnalysisError("");note("영상을 불러왔습니다. 이제 AI 분석을 실행할 수 있습니다.")}
 async function extractFrames(file:File){const url=URL.createObjectURL(file),v=document.createElement("video");v.preload="metadata";v.muted=true;v.src=url;await new Promise<void>((ok,bad)=>{v.onloadedmetadata=()=>ok();v.onerror=()=>bad(new Error("영상을 읽을 수 없습니다."))});if(v.duration>120)throw new Error("테스트 영상은 2분 이하만 분석할 수 있습니다.");const canvas=document.createElement("canvas"),ctx=canvas.getContext("2d")!;canvas.width=640;canvas.height=Math.max(360,Math.round(640*v.videoHeight/v.videoWidth));const frames:string[]=[];for(let i=0;i<8;i++){v.currentTime=Math.min(v.duration-.05,(v.duration*(i+.5))/8);await new Promise<void>(ok=>{v.onseeked=()=>ok()});ctx.drawImage(v,0,0,canvas.width,canvas.height);frames.push(canvas.toDataURL("image/jpeg",.72))}URL.revokeObjectURL(url);return{frames,duration:v.duration}}
 async function analyze(){if(!videoFile)return;setAnalyzing(true);setAnalysisError("");try{const media=await extractFrames(videoFile),r=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...media,fileName:videoName})}),data=await r.json();if(!r.ok)throw new Error(data.error||"분석에 실패했습니다.");setAnalysis(data.analysis);setLines(data.analysis.cuts.map((x:AnalysisCut)=>x.dialogue));note("원본 중심 4컷 분석이 완료됐습니다.")}catch(e){setAnalysisError(e instanceof Error?e.message:"분석에 실패했습니다.")}finally{setAnalyzing(false)}}
 async function record(i:number){if(rec!==null){recorder.current?.stop();return}try{const s=await navigator.mediaDevices.getUserMedia({audio:true}),r=new MediaRecorder(s);chunks.current=[];r.ondataavailable=e=>chunks.current.push(e.data);r.onstop=()=>{setAudio(a=>({...a,[i]:URL.createObjectURL(new Blob(chunks.current,{type:"audio/webm"}))}));setRec(null);s.getTracks().forEach(t=>t.stop())};r.start();recorder.current=r;setRec(i)}catch{note("마이크 권한을 허용해 주세요.")}}
 return <main className="ten"><header className="ten-head"><button className="ten-logo" onClick={()=>setPage(1)}><Clapperboard/><span><b>방셀 스토리 스튜디오</b><small>10개 명장면 · 4컷 제작실</small></span></button><nav>{nav.map((x,i)=><button key={x} className={page===i?"on":""} onClick={()=>setPage(i)}><i>{i+1}</i>{x}</button>)}</nav><button className="ten-save" onClick={save}><Save/>저장</button></header><section className="ten-wrap">
 {page===0&&<><Hero icon={<UserRound/>} sub="제작 준비" title="캐릭터와 팬부터 설정합니다" desc="모든 항목을 직접 작성할 수 있으며 저장 후에도 언제든 수정할 수 있습니다."/><div className="setup"><Panel title="스트리머 캐릭터"><Field label="캐릭터 이름" value={name} set={setName}/><Field label="말투와 분위기" value={tone} set={setTone}/><Field label="팬 호칭" value={fanCall} set={setFanCall}/></Panel><Panel title="팬 개인화"><Field label="팬 닉네임" value={fan} set={setFan}/><Field label="둘만의 기억" value={memory} set={setMemory}/><Field label="마지막 컷 요청" value={request} set={setRequest}/></Panel></div></>}
 {page===1&&<><Hero icon={<Sparkles/>} sub="원본 중심 자료실" title="명장면을 하나씩 분석해 쌓습니다" desc="가져온 영상을 실제 AI가 검토해 확인된 장면을 점차 추가합니다."/>
 <section className="video-import">
  <div className="video-copy"><span><FileVideo/></span><div><small>새 명장면 영상</small><h2>영상으로 원본 장면 분석하기</h2><p>대표 프레임 8장을 추출해 인물, 표정, 카메라, 조명, 소품과 원본 흐름을 4컷으로 정리합니다.</p></div></div>
  <label className="video-button"><Upload/>영상 선택<input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={video}/></label>
  {videoUrl?<div className="video-preview"><video src={videoUrl} controls/><div><BadgeCheck/><p><b>{videoName}</b><small>영상 불러오기 완료 · 최대 2분·80MB</small></p><button className="analyze-button" disabled={analyzing} onClick={analyze}>{analyzing?<><span className="spinner"/>프레임 추출·분석 중</>:<><Sparkles/>AI로 4컷 분석</>}</button></div></div>:<div className="video-empty">아직 선택한 영상이 없습니다.</div>}
  {analysisError&&<div className="analysis-error"><b>분석하지 못했습니다.</b><span>{analysisError}</span></div>}
  {analysis&&<div className="analysis-success"><BadgeCheck/><div><b>{analysis.sceneTitle}</b><span>본편 구간 {analysis.mainStart.toFixed(1)}–{analysis.mainEnd.toFixed(1)}초 · {analysis.excludedNote}</span></div><button onClick={()=>setPage(2)}>4컷 결과 확인<ChevronRight/></button></div>}
 </section>
 <div className="cat-index">{[...new Set(W.map(x=>x.category))].map(x=><span key={x}>{x}<b>2</b></span>)}</div>{[...new Set(W.map(x=>x.category))].map(cat=><section className="work-group" key={cat}><h2>{cat}<small>2 작품</small></h2><div className="work-row">{W.map((x,i)=>x.category===cat&&<button key={x.title} className={idx===i?"work-card on":"work-card"} onClick={()=>choose(i)}><span>0{i%2+1}</span><small>{x.status}</small><h3>{x.title}</h3><p>{x.scene}</p><ChevronRight/></button>)}</div></section>)}<Summary w={w} go={()=>setPage(2)}/></>}
 {page===2&&<><Hero icon={<Sparkles/>} sub="원본 장면 분석" title={`${w.title} · 원본 중심 4컷`} desc="패러디 없이 원본의 사건, 감정, 동작과 연출을 먼저 정리합니다. 오른쪽 대사 메모는 직접 수정할 수 있습니다."/><div className="original-mode"><div><BadgeCheck/><p><b>원본 분석 모드</b><small>패러디·재해석 스타일은 사용하지 않습니다.</small></p></div><div><b>4컷 고정</b><small>업로드 영상의 시간 흐름에 맞춰 구성</small></div></div><div className="script-list">{w.cuts.map((x,i)=><article key={i}><b className="cut-no">0{i+1}</b><div><small>원본 장면 분석</small><h3>{x.scene}</h3><p>{x.emotion}</p><em>영상 확인 전 자료는 검토가 필요한 분석 초안입니다.</em></div><label><small>실제 대사 메모 · 수정 가능</small><textarea value={lines[i]} onChange={e=>setLines(a=>a.map((v,j)=>j===i?e.target.value:v))}/></label></article>)}</div></>}
 {page===3&&<><Hero icon={<Camera/>} sub="와루도 촬영 지시서" title={`${w.title} · 컷별 촬영 설계`} desc="배경, 연기, 카메라, 광원, 소품과 실행 순서를 컷마다 확인합니다."/><div className="warudo-note"><Lightbulb/><p><b>공통 설정</b> 1920×1080 · 30fps · 접촉 그림자 켜기 · 배경 흐림 12~18% · 카메라는 Ease In/Out</p></div><div className="shot-list">{w.cuts.map((x,i)=><article key={i}><header><span>0{i+1}</span><h3>{x.scene}</h3><b>3–4초</b></header><div><Spec k="배경·공간" v={x.set}/><Spec k="표정·동작" v={x.acting}/><Spec k="카메라" v={x.camera}/><Spec k="조명" v={x.light}/><Spec k="소품·효과" v={x.props}/><Spec k="와루도 실행" v={`장면 프리셋 → 캐릭터를 중앙 ${i%2?"오른쪽":"왼쪽"} 구역에 배치 → 표정·모션 키프레임 → 3~4초 촬영 → 앞뒤 6프레임을 남겨 내보내기`}/></div></article>)}</div></>}
 {page===4&&<><Hero icon={<Mic/>} sub="음성 녹음 + 완성" title="4컷 대사에 직접 목소리를 넣습니다" desc="컷별 녹음·듣기·삭제가 가능하며 대본도 마지막까지 수정할 수 있습니다."/><div className="voice-grid">{w.cuts.map((x,i)=><article key={i}><div className="voice-visual"><span>0{i+1}</span><Camera/><p>{x.scene}</p></div><textarea value={lines[i]} onChange={e=>setLines(a=>a.map((v,j)=>j===i?e.target.value:v))}/><div><button className={rec===i?"recording":""} onClick={()=>record(i)}>{rec===i?<><CircleStop/>정지</>:<><Mic/>녹음</>}</button>{audio[i]&&<><button onClick={()=>new Audio(audio[i]).play()}><Play/>듣기</button><button onClick={()=>setAudio(a=>{const n={...a};delete n[i];return n})}><Trash2/>삭제</button></>}</div></article>)}</div><div className="finish-bar"><div><Volume2/><p><b>음성 {Object.keys(audio).length}/4컷 적용</b><small>현재 브라우저에서 재생할 수 있습니다.</small></p></div><button onClick={()=>navigator.clipboard.writeText(lines.join("\n\n")).then(()=>note("대본을 복사했습니다."))}><Copy/>대본 복사</button><button onClick={save}><Save/>프로젝트 저장</button></div></>}
 </section>{toast&&<div className="ten-toast"><BadgeCheck/>{toast}</div>}</main>
}
function Hero({icon,sub,title,desc}:{icon:React.ReactNode;sub:string;title:string;desc:string}){return <div className="ten-hero"><span>{icon}</span><div><small>{sub}</small><h1>{title}</h1><p>{desc}</p></div></div>}
function Panel({title,children}:{title:string;children:React.ReactNode}){return <section className="ten-panel"><h2>{title}</h2>{children}</section>}
function Field({label,value,set}:{label:string;value:string;set:(v:string)=>void}){return <label className="ten-field">{label}<input value={value} onChange={e=>set(e.target.value)}/></label>}
function Summary({w,go}:{w:Work;go:()=>void}){return <section className="scene-summary"><header><div><small>선택한 장면</small><h2>{w.title}</h2><p>{w.scene}</p></div><span><BadgeCheck/>{w.status}</span></header><div>{w.cuts.map((x,i)=><article key={i}><b>0{i+1}</b><h3>{x.scene}</h3><p>{x.emotion}</p></article>)}</div><button onClick={go}>4컷 대본 열기<ChevronRight/></button></section>}
function Spec({k,v}:{k:string;v:string}){return <div><small>{k}</small><p>{v}</p></div>}
