<template>
    <div class="header">
        <div class="header-inner clearfix">
            <router-link to="/" class="back2home left"></router-link>
            <ul class="header-list clearfix">
                <li class="left" v-for="(item, index) in pages" :key="index">
                    <router-link :to="item.router" active-class="active">{{ item.name }}</router-link>
                </li>
            </ul>
            <div class="weather">
                <div>
                    <span>今天天气：{{ todayWeather.type }} {{ todayWeather.high }} {{ todayWeather.low }}</span>
                    <span>{{ todayWeather.fx }}：{{ todayWeather.fl }}</span>
                </div>
                <div>
                    <span>明天天气：{{ tomorrowWeather.type }} {{ tomorrowWeather.high }} {{ tomorrowWeather.low }}</span>
                    <span>{{ tomorrowWeather.fx }}：{{ tomorrowWeather.fl }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            location: '',
            todayWeather: Object,
            tomorrowWeather: Object,
            page: '',
            pages: [
                {router: '/', name: '首页'},
                {router: 'dota', name: 'Dota2 Wiki'},
                {router: 'cartoon', name: '动漫番剧'}
            ]
        }
    },
    created () {
        this.getLocation();
        this.page = location.pathname.substr(1);
    },
    methods: {
        getLocation () {
            this.$http.get('/location/iplookup/iplookup.php?format=js').then(
                (res) => {
                    let city = JSON.parse(res.data.split('=')[1].split(';')[0]).city;
                    this.location = this.reconvert(city);
                    this.getWeather(city);
                }
            )
        },
        getWeather (city) {
            this.$http.get('/api/weather/json.shtml?city=' + city).then(
                (res) => {
                    let today = new Date().getDate();
                    let forecast = res.data.data.forecast;
                    let tomorrowIndex;
                    forecast.forEach((el, index) => {
                        if (el.date.indexOf(today) > -1) {
                            tomorrowIndex = index + 1;
                            this.todayWeather = el;
                        }
                    });
                    this.tomorrowWeather = forecast[tomorrowIndex];
                }
            )
        },
        reconvert (str){ 
            str = str.replace(/(\\u)(\w{1,4})/gi,function($0){ 
                return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16))); 
            }); 
            str = str.replace(/(&#x)(\w{1,4});/gi,function($0){ 
                return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16)); 
            }); 
            str = str.replace(/(&#)(\d{1,6});/gi,function($0){ 
                return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"))); 
            }); 
              
            return str; 
        }
    }
}
</script>

<style lang="less">
    .header {
        position: relative;
        min-width: 1032px;
        background: hsla(0,0%,100%,.4);
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        background-clip: content-box;
        .header-inner {
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 1000px;
            height: 52px;
            padding: 0 16px;
            margin: 0 auto;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items:  center;
            justify-content: space-between;
            transition: -webkit-transform .3s;
            transition: transform .3s;
            transition: transform .3s,-webkit-transform .3s;
            .back2home {
                width: 208px;
                height: 37px;
                background: url('../../assets/img/logo.png') no-repeat center;
                background-size: contain;
            }
        }
        .header-list {
            li {
                margin: 0 1vw;
                padding: 0 10px;
                border-right: 1px solid #969aa1;
                a {
                    color: #8590a6;
                    &.active {
                        color: #333;
                    }
                }
            }
        }
    }
</style>
