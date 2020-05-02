<template>
	<div id="app">
		<van-row>
			<form action="/">
				<van-search show-action v-model="value" shape="round" background="#bb463c" placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" @focus="onFocus">
					<template #action>
						<div :style="searchActionStyle">
							注册或登录
						</div>
					</template>
					<template #left>
						<div style="width: 5rem;font-weight:bold;color: #FFFFFF">
							今日博客
						</div>
					</template>
				</van-search>
			</form>
		</van-row>
		<van-row>
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<van-cell v-for="item in list" :key="item.url" :title="item.title" :label="item.subtitle">
						<template #title>
							<a class="blog-title" :href="item.url">
								<span class="custom-title">
									{{item.title}}
								</span>
							</a>
						</template>
						<template #label>
							<a class="blog-depict" :href="item.url">
								{{item.subtitle}}
							</a>
						</template>
					</van-cell>
				</van-list>
			</van-pull-refresh>
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
				isSearchOnFocus: false
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
				Toast('取消');
			},
			onFocus() {
				this.isSearchOnFocus = true;
			}
		},
		computed: {
			searchActionStyle() {
				let width = this.isSearchOnFocus ? '100%' : '10rem';
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
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		margin-top: 0px;
	}

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
</style>
