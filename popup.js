console.log(3333333);
function getData() {
    $.ajax({
        url:"https://devapi.qweather.com/v7/weather/now",
        method:"get",
        contentType:"application/json",
        data:{
            location:"101280405",
            key:'39530b2769414854928c40945d22ce91'
        },
        success:(res) => {
            if(res.code !== "200"){
                alert("获取天气出错")
            }else {
                let nowImg = document.querySelector("#nowImg");
                nowImg.src = `./icon/${res.now.icon}.png`;
                toInnerHtml('#temp',`${res.now.temp}℃`);
                toInnerHtml('#text',res.now.text);
                toInnerHtml('#windDir',res.now.windDir);
                toInnerHtml('#windSpeed',`实况风速：${res.now.windSpeed}km/h`);
            }
        },
        error:(err) => {
            console.log(err)
        }
    })
}

function toInnerHtml(id,str) {
    let el = document.querySelector(id);
    el.innerHTML = str;
}

function getThreeDay() {
    $.ajax({
        url:"https://devapi.qweather.com/v7/weather/3d",
        method:"get",
        contentType:"application/json",
        data:{
            location:"101280405",
            key:'39530b2769414854928c40945d22ce91'
        },
        success:(res) => {
            console.log(res);
            if(res.code !== "200"){
                alert("获取天气出错")
            }else {
                let str = "";
                res.daily.forEach(v => {
                    str += `<div class="weather-bottom-item">
                                <p>${v.fxDate}</p>
                                <p><img style="width: 30px;height: 30px" src='icon/${v.iconDay}.png'></p>
                                <p>${v.tempMin}/${v.tempMax}℃</p>
                                <p>${v.textDay}</p>
                            </div>`
                });
                $("#daily").append(str);
            }
        },
        error:(err) => {
            // console.log(err)
        }
    })
}

getData();
getThreeDay();
