/*
 * @Author: your name
 * @Date: 2020-12-22 11:10:57
 * @LastEditTime: 2021-01-01 20:50:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xccgrid manage system/index/index.js
 */
var app = new Vue({
    el: "#app",
    data: {
        which_blue: 2,
        user_manage_show: false,
        passage_title: '',
        passage_intro: '',
        passage_photo: '',
        passage_url: '',
        gettime: '',
        gettimeform: '',
        newsarr: [],
        userarr: [],
        table2show: false,
        warning1show: false
    },
    created: function () {
        //这里是页面加载的时候会执行的东西
        this.geruserlist()


    },
    methods: {

        menu_index: function () {
            this.which_blue = 0
        },
        menu_user: function () {
            this.which_blue = 1,
                this.user_manage_show = true

        },
        menu_news: function () {
            this.which_blue = 2

        },
        menu_data: function () {
            this.which_blue = 3

        },

        getinput1(event) {
            this.passage_title = event.currentTarget.value
        },
        getinput2(event) {
            this.passage_intro = event.currentTarget.value
        },
        getinput3(event) {
            this.passage_photo = event.currentTarget.value
        },
        getinput4(event) {
            this.passage_url = event.currentTarget.value

        },
        passage_publish() {
            console.log(this.passage_title, this.passage_intro, this.passage_photo, this.passage_url);
            this.getTime()
            console.log(this.gettime);
            axios({
                method: 'post',
                url: "http://127.0.0.1:8000/passage/add_passage",
                data: {
                    passage_title: this.passage_title,
                    passage_intro: this.passage_intro,
                    passage_photo: this.passage_photo,
                    passage_url: this.passage_url,
                    gettime: this.gettime,
                    gettimeform: this.gettimeform,
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data.loginnum == 200) {
                    alert("发布成功")
                } else {
                    alert("发布失败，请联系大佬！QQ：2605191106")

                }

            });
        },

        getTime: function () {
            var _this = this;
            let yy = new Date().getFullYear();
            var mm =
                new Date().getMonth() < 10
                    ? "0" + (new Date().getMonth() + 1)
                    : new Date().getMonth() + 1;
            var dd =
                new Date().getDate() < 10
                    ? "0" + new Date().getDate()
                    : new Date().getDate();
            let hh = new Date().getHours();
            let mf =
                new Date().getMinutes() < 10
                    ? "0" + new Date().getMinutes()
                    : new Date().getMinutes();
            let ss =
                new Date().getSeconds() < 10
                    ? "0" + new Date().getSeconds()
                    : new Date().getSeconds();
            _this.gettime = '' + yy + mm + dd + hh + mf + ss;
            _this.gettimeform = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
        },
        //获取数据库中的所有已经保存的新闻
        passage_acquire() {

            console.log("获取");
            //现在向服务器发送post请求
            axios({
                method: 'POST',
                url: "http://127.0.0.1:8000/passage/get_passage",
                data: {
                    num: 1
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).then((res) => {
                this.newsarr = res.data
                console.log(this.newsarr);
                this.table2show = true
            });

        },
        geruserlist() {
            axios({
                method: 'POST',
                url: "http://127.0.0.1:8000/info/getuser",
                data: {
                    num: 1
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).then((res) => {
                console.log(res.data);
                this.userarr = res.data
                console.log(this.userarr);
            });
        },
        passage_delete() {
            console.log("删除");
            this.warning1show = true
        },
        delete_confirm() {
            //已经确定要删除了
            //下面调用删除函数对这个东西进行删除处理。

        },
        delete_cancel() {
            this.warning1show = false
        }


    },

})