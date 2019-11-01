<template>
	<div class="registerBox">
		<div class="regInfoCenter">
			<div class="centerLeft"><img :src="loadImg" /></div>
			<div class="centerRight">
				<form>
					<div class="titles">登录</div>
					<div class="phone"><input placeholder="请输入手机号码" v-model="formData.username" /></div>
					<div class="code">
						<input placeholder="请输入密码" type="password" v-model="formData.password" />
					</div>
					<div class="btnRegBox">
						<button class="btnRe" @click.prevent="load">提交</button>
						<div class="tip" @click="toRegister">没有账号，去注册</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loadImg:require("../../assets/register.png"),
			formData: {
				username: '',
				password: ''
			}
		};
	},
	created() {},
	methods: {
		load() {
			let tel=this.formData.username
			var regphone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
			var zuoji=/^([0-9]{3,4}-)?[0-9]{7,8}$/
			if(regphone.test(tel)||zuoji.test(tel)){
				var that = this;
				this.$store
				.dispatch('login', this.formData)
				.then(res => {
					console.log(res)
					this.$Message.success('登录成功');
					that.$router.push({ path: this.redirect || '/' });
				})
				.catch(err => {
					console.log(err);
					this.$Message.error(err.msg);
				});
			}else{
				this.$Message.error("手机号错误！")
			}
			
		},
		toRegister(){
			this.$router.push({
				path:"/register"
			})
		}
	}
};
</script>

<style scoped>
	
.registerBox {
	position: fixed;
	width: 100%;
	height: 100%;
	opacity: 1;
	background: rgba(108, 179, 255, 1);
	top: 0;
	left: 0;
}
.regInfoCenter {
	width: 800px;
	height: 460px;
	background: rgba(255, 255, 255, 1);
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	border-radius: 10px;
	display: flex;
	align-items: center;
	padding: 0 28px;
	box-sizing: border-box;
}
.centerLeft {
	width: 352px;
	height: 352px;
	margin-right: 62px;
}
.centerLeft img {
	width: 100%;
	height: 100%;
}
.centerRight {
	height: 352px;
	width: 260px;
	font-size: 14px;
}
.centerRight input {
	border: none;
	outline: none;
	width: 100%;
	font-size: 16px;
	height: 25px;
	line-height: 25px;
}
.titles {
	margin-bottom: 20px;
	font-size: 36px;
	color: #353535;
}
.phone,
.code {
	border-bottom: 1px solid #d3e8ff;
	padding: 10px 10px;
	box-sizing: border-box;
	color: #a1acb8;
}
.code {
	border-bottom: 1px solid #d3e8ff;
	position: relative;
}
.code input {
	
}
.code div {
	background-color: #5eacf6;
	width: 19px;
	height: 14px;
	opacity: 1;
	background: rgba(161, 172, 184, 1);
	right: 10px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}
.btnRegBox {
	text-align: center;
	cursor: pointer;
}
.btnRe {
	border: none;
	outline: none;
	width: 140px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	margin-top: 30px;
	margin-bottom: 16px;
	color: #fff;
	border-radius: 20px;
	display: inline-block;
	cursor: pointer;
	background: linear-gradient(to right, #138dee 0%, #a4c9fd 100%);
}
.tip {
	color: #5eacf6;
	font-size: 12px;
	cursor: pointer;
}

@media (min-width: 768px) and (max-width: 996px) {
	.regInfoCenter {
		width: 600px;
	}
	.centerLeft {
		width: 300px;
		height: 300px;
	}
	.centerRight {
		height: 300px;
	}
}
@media (max-width: 768px) {
	.centerLeft {
		display: none;
	}
	.regInfoCenter {
		width: 90%;
		justify-content: center;
	}
	.registerBox {
		min-width: 300px;
		overflow: auto;
		position: absolute;
	}
}
</style>
