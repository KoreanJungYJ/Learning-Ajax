//가장 중요한 XMLHttpRequest

/*
XMLHttpRequest 객체는 비동기적으로 데이터를 전송하거나 읽어오는 기능을 한다.
비동기 통신에 있어서 아주 간단하고 명료하게 프로그램을 작성할 수 있으며,
Ajax에서 통신을 담당하고 데이터를 송-수신할 수 있는 핵심 객체가 바로 XMLHttpRequest이다.

거의 모든 웹 브라우저에서 이 객체를 지원한다고 한다.
*/

//다음은 XMLHttpRequest 객체를 얻는 방법이다.
let xhr =  new XMLHttpRequest();

//혹은
let xhttp;
function createHttpRequest(){
    xhttp = new XMLHttpRequest();
}


//XMLHttpRequest 객체의 핵심 메서드 및 프로퍼티는 다음과 같다.
//진짜 매우매우ㅐㅜㅇ매우ㅐ ㅈㄵㅇㄵㄵ ㅈㄴ 중요하니 꼭 알아야 한다.

//프로퍼티
/*
    onreadystatechange : 통신 상태가 변화될 때 마다 호출되는 이벤트 핸들러
    readyState : HTTP 통신 상태 값 (밑에 설명 참조)
    status : HTTP 상태 코드 값 (밑에 설명 참조)
    statusText : HTTP 상태의 상태 메시지 값
    
    responseText : 서버 응답 값 - plainText 형식이다.
    responseXML : 서버 응답 값 - XML 형식이다.
*/

//메서드
/*
    abort() : 현재의 비동기 통신 중단
    getAllResponseHeaders() : 모든 HTTP 응답 헤더 값
    getResponseHeader(header) : 지정된 HTTP 응답 헤더 값
    open(...) : *(중요) HTTP 요청 초기화
    setRequestHeader(header, value) : 요청 헤더 설정
    send(본문) : *(중요) HTTP 실제 요청
*/



//readyState는 HTTP 통신 상태 값을 의미한다.
//status는 HTTP 상태 코드 값을 의미한다.

/*
readyState의 값들은 총 4개이다.

    0 : 초기화되지 않은 상태 - open메서드 호출 전
    1 : 로드 중 - open은 호출 완료, send는 호출 전
    2 : 로드는 완료 - open 및 send 호출 완료, 응답 status/header 미처리
    3 : 일부 응답 처리 완료 - 응답 status/header 처리 완료, 본문은 미처리
    4 : 모든 응답 처리 완료
*/

/*
status의 값들

    200 : 정상 처리 상태
    401 : 인증 필요 상태 (Unauthorized)
    403 : 액세스 거부 (Forbidden)
    404 : 요청 자원 존재 x (Not Found)
    500 : 서버 내부 에러 (사용자 탓 아님 ㅎ) - Internal Server Error
    503 : 요청 서버 사용 불가 (이것도 사용자 탓 아님 ㅎ) - Service Unavailable
*/

/*
기본적으로 ajax 통신 구현할 때는 아래처럼 readyState가 4인 상태에서
status가 200이 되도록 비교하고 정상적으로 완료되었다는 것을 확인한다.

그 후 다음 작업을 진행해야 함.
*/

if(xhr.readyState == 4){
    if(xhr.status == 200){
        //정상 처리 작업
    }else{
        //에러 처리 작업
    }
}

xhr.open("GET", "index.html", true);
//여기서 open은 메서드의 요청을 초기화하는 역할을 한다.
//true면 비동기, false면 동기 방식으로 처리하며 기본적으로는 true를 사용한다.
/*
open의 각각 인자들

    첫 번째 : 메서드 방식 - GET이나 POST 등
    두 번째 : 요청할 URL 값 - index.html 등
    세 번째 : 생략 가능 - 동기인지 비동기인지 설정 가능
*/

xhr.send(null);  //GET 방식
xhr.send(value); // POST 방식

/*
GET 방식에서 - send() 메서드의 인자값으로 null을 지정한다.
: url 파라미터는 open()에서의 요청 URL 뒤에 '?'와 '&'를 사용하는 쿼리스트링을 이용
하여 설정한다.

POST 방식에서 - 요청 URL 값은 open() 메서드에서 지정한다.
: url 파라미터는 send()에서 지정한다. 
*/

//GET일 때
xhr.open("GET", "index.jsp?name=test&age=20", true);
xhr.send(null);

//POST일 때
xhr.open("POST", "index.jsp", true);
let sendString = "name=test&age=20";
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(sendString);

/*
위의 POST 방식에서는 특히 setRequestHeader()메서드가 중요하다.

이는 한글의 전송을 제대로 하기 위해 필요한데 이를 위해
Content-Type 프로퍼티의 값을 반드시 "application/x-www-form-urlencoded"로
설정해야 한다고 한다.

*GET 방식에서는 기본적으로 한글 처리가 가능하다고 하니 따로 Content-Type을 지정
해줄 필요는 없는 것 같다.
*/