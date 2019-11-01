<template>
	<div class="registerBox">
		<div class="regInfoCenter">
			
			<div class="centerLeft"><img :src="loadImg" /></div>
			<div class="centerRight">
				<div class="titles">注册</div>
				<div v-show="registerFrom">
					<div class="phone"><input v-model="fromData.phone" placeholder="请输入电话号码"/></div>
					<div class="code">
						<input placeholder="请输入验证码" v-model="fromData.code" />
						<div   @click="getCodes()">获取验证码</div>
					</div>
				</div>
				<div  v-show="!registerFrom">
					<Radio-group v-model="fromData.type">
						<Radio label="企业"></Radio>
						<Radio label="学校"></Radio>
					</Radio-group>
					<div class="phone" v-show="fromData.type=='企业'">
						<input  v-model="fromData.tenantName" :key="fromData.tenantName" placeholder="请输入企业名称"/>
					</div>
					<div class="phone" v-show="fromData.type=='学校'">
						<input  v-model="fromData.tenantName" :key="2" placeholder="请输入学校名称"/>
					</div>
					<div class="phone">
						<input  v-model="fromData.realName" placeholder="请输入真实姓名"/>
					</div>
					<div class="phone">
						<input type="password"  v-model="fromData.password" placeholder="请输入密码"/>
					</div>
				</div>
				<div class="btnRegBox">
					<div class="btnRe" v-show="registerFrom" @click="toNext()">下一步</div>
					<div class="btnRe" v-show="!registerFrom" @click="submits()">提交</div>
					<div class="tip" @click="toLoad">已有账号，去登陆</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { regiter,getCode,checkCode } from '@/api/company';
export default {
	data() {
		return {
			loadImg:require("../../assets/register.png"),
			fromData:{
				"phone":"",
				"code":"",
				"type":"企业",
				"tenantName":"",
				"realName":"",
				"password":""
			},
			registerFrom:true
		}
	},
	
	methods:{
		submits() {
			regiter(this.fromData).then(res => {
				if (res.success) {
					this.$Message.success("注册成功！")
					// this.conpanyinfo = JSON.stringify(res.data);
					this.toLoad()
				} else{
					this.$Message.error(res.msg);
				}
			});
		},
		toLoad(){
			this.$router.push({
				path: '/login',
				
			});
		},
		toNext(){
			if (this.fromData.phone&&this.fromData.code) {
				let tel=this.fromData.phone;
				var regphone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
				var zuoji=/^([0-9]{3,4}-)?[0-9]{7,8}$/
				if(regphone.test(tel)||zuoji.test(tel)){
					checkCode({
						phoneNo:this.fromData.phone,
						smsCode:this.fromData.code
					}).then(res=>{
						console.log(99999)
						if(res.success){
							this.registerFrom=false
							console.log(res,"校验成功")
						}else{
							this.$Message['error']({
								background: true,
								content: res.msg
							});
						}
					})
				}else{
					this.$Message.error('电话号码格式不正确！');
				}
			} else{
				this.$Message.error('请填写完整信息');
			}
			
		},
		getCodes(){
			let tel=this.fromData.phone
			var regphone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
			var zuoji=/^([0-9]{3,4}-)?[0-9]{7,8}$/
			if(regphone.test(tel)||zuoji.test(tel)){
				getCode({
					phoneNo:this.fromData.phone
				}).then(res=>{
					if(res.success){
						console.log(res)
						this.$Message.success(res.msg);
					}else{
						this.$Message['error']({
							background: true,
							content: res.msg
						});
					}
				})
			}else{
				this.$Message.error('电话号码格式不正确！');
			}
		},
		
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
	padding: 14px 10px;
	box-sizing: border-box;
	color: #a1acb8;
}
.code {
	border-bottom: 1px solid #d3e8ff;
}
.code input {
}
.code div {
	background-color: #5eacf6;
	width: 84px;
	height: 24px;
	border-radius: 4px;
	color: #fff;
	line-height: 24px;
	font-size: 14px;
	display: inline-block;
	text-align: center;
	float: right;
	margin-right: 0px;
	cursor: pointer;
}
.btnRegBox {
	text-align: center;
}
.btnRe {
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
