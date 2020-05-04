<template>
    <div>
        <van-row>
            <van-sticky>
                <form action="/">
                    <van-search autofocus="true" show-action v-model="value" shape="round" background="#bb463c"
                        placeholder="请输入搜索关键词" @search="onSearch" @focus="onFocus">
                        <template #left>
                            <div style="font-size:1.2rem; width: 5.5rem;font-weight:bold;color: #FFFFFF">
                                今日博客
                            </div>
                        </template>
                        <template #action>
                            <div @click="onCancel" style="width: 100%; color:#FFFFFF;font-weight:bold">
                                取消
                            </div>
                        </template>

                    </van-search>
                </form>
            </van-sticky>
        </van-row>
        <van-row>
            <div style="padding: 0.625rem; font-weight: bold;">
                猜你想搜
            </div>
            <div id="hot-query">
                <div v-for="item in queryList" :key="item">
                    {{item}}
                </div>
            </div>
        </van-row>

    </div>
</template>

<script>
    import axios from 'axios';
    import {
        Toast
    } from 'vant';

    var page = 0;

    export default {
        name: 'App',

        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                value: '',
                isSearchOnFocus: false,
                queryList: ['谷歌FastBert', '跳广场舞的视频 中国大妈占领世界', '华为手表GT2', '甄嬛传']
            };
        },
        methods: {
            onLoad() {
                let self = this;
                var url = '/api/page/' + page;
                axios.get(url)
                    .then(function(response) {
                        console.log(response);
                        if (self.refreshing) {
                            self.list = [];
                            self.refreshing = false;
                        }

                        let data = response.data;

                        for (let i = 0; i < data.length; i++) {
                            self.list.push(data[i]);
                        }
                        page += 1;
                        self.loading = false;

                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            },
            onRefresh() {
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            },
            onSearch(val) {
                Toast(val);
            },
            onCancel() {
                this.$router.push({
                    path: '/'
                });
            },
            onFocus() {
                this.isSearchOnFocus = true;
            }
        },
        computed: {
            searchActionStyle() {
                let width = '100%';
                return {
                    width: width,
                    display: 'block',
                    float: 'right',
                    color: '#FFFFFF'
                };
            },
        }
    }
</script>

<style>
    .xuanxiang {
        background-color: #004085;
    }

    .blog-title {
        color: #0085A1;
        transition: all 0.2s;
    }

    .blog-depict {
        color: #969799;
        transition: all 0.2s;
    }

    .custom-title {
        font-size: 1.0rem;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }

    .van-search__content {
        width: 130px;
        /* 设定起始宽度 */
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.4s ease-in-out;
        /* 设置宽度改变时的动画 */
    }

    /* 当输入框获得焦点时，将宽度改为100% */
    .van-search__content:focus {
        width: 100%;
    }

    #hot-query {
        padding: 0.1rem 1.5rem;
        display: -webkit-flex;
        /* Safari */
        -webkit-flex-wrap: wrap;
        /* Safari 6.1+ */
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #f6f6f6;
    }

    #hot-query div {
        width: 50%;
        height: 1.875rem;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    #hot-query div::after {
        content: "";
    }
</style>
