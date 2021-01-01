/*
 * @Author: your name
 * @Date: 2020-12-22 11:10:57
 * @LastEditTime: 2021-01-01 16:47:57
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


    }
})