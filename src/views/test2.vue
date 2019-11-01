<template>
	<div class="hello">
		<div class="user-header">
			<input type="file" name="image" accept="image/*" @change="onchangeImgFun" class="header-upload-btn user-header-com" />
			<img alt="" :src="imgStr" class="user-header-img user-header-com" />
			<p class="tip">
				图片限制1M
				<span class="error">{{ errorStr }}</span>
			</p>
		</div>
		<div class="head-portrait">
			<img class="head-portrait-img" :src="pic" />
			<div class="head-input">
				<input type="file" class="headinput" readonly="false" accept="image/gif, image/jpeg, image/jpg, image/png, image/svg" @change="previewPic" />
				<div class="headimg"><img src="" /></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			pic: require('../assets/logo.png'),
			imgStr: require('../assets/logo.png'),
			errorStr: ''
		};
	},
	methods: {
		onchangeImgFun(e) {
			var file = e.target.files[0];
			console.log(file);
			// 获取图片的大小，做大小限制有用
			let imgSize = file.size;
			console.log(imgSize);
			var _this = this; // this指向问题，所以在外面先定义
			// 比如上传头像限制5M大小，这里获取的大小单位是b
			if (imgSize <= 1024 * 1024) {
				// 合格
				_this.errorStr = '';
				console.log('大小合适');
				// 开始渲染选择的图片
				// 本地路径方法 1
				this.imgStr = window.URL.createObjectURL(e.target.files[0]);
				console.log(window.URL.createObjectURL(e.target.files[0])); // 获取当前文件的信息

				// base64方法 2
				// var reader = new FileReader();
				// reader.readAsDataURL(file); // 读出 base64
				// reader.onloadend = function() {
				// 	// 图片的 base64 格式, 可以直接当成 img 的 src 属性值
				// 	var dataURL = reader.result;
				// 	console.log(dataURL);
				// 	_this.imgStr = dataURL;
				// 下面逻辑处理
				// };
			} else {
				console.log('大小不合适');
				_this.errorStr = '图片大小超出范围';
			}
		},
		previewPic: function(e) {
			var that = this;
			var file = e.target.files[0];
			var fr = new FileReader();
			fr.readAsDataURL(file);
			fr.onload = function(e) {
				that.pic = e.target.result;
				that.form.headPortrait = that.pic;
				that.$emit('showpage', that.form);
			};
		}
	}
};
</script>

<style scoped>
.user-header {
	position: relative;
	display: inline-block;
}
.user-header-com {
	width: 144px;
	height: 144px;
	display: inline-block;
}
.header-upload-btn {
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
	/* 通过定位把input放在img标签上面，通过不透明度隐藏 */
}
.tip {
	font-size: 14px;
	color: #666;
}
/* error是用于错误提示 */
.error {
	font-size: 12px;
	color: tomato;
	margin-left: 10px;
}

.Basic-div {
	padding: 20px 30px;
	background: #fff;
}
.head-portrait1:hover .head-input {
	display: block;
}
.head-input {
	display: none;
}
.Basic-content1:hover .editimg {
	display: block;
	background: #00c091;
	width: 25px;
	height: 25px;
	border-radius: 2px;
	position: absolute;
	top: 2px;
	right: 2px;
	text-align: center;
}
.Basic-information span {
	border-right: 1px solid #747474;
	padding: 0px 10px;
	margin: 5px 0px;
	display: inline-block;
}
.Basic-information span:last-child {
	border: none;
}
.Basic-information span:first-child {
	padding-left: 0px;
}
@media screen and (min-width: 800px) {
	.Basic-div {
		display: flex;
	}
	.head-portrait1:hover {
		border: 1px dashed #00c091;
		margin: -1px;
	}
	.headinput {
		width: 125px;
		height: 155px;
		position: absolute;
		top: 3px;
		z-index: 2;
		opacity: 0;
	}
	.headimg {
		width: 127px;
		height: 157px;
		position: absolute;
		top: 5px;
		background: #00c091;
		text-align: center;
		line-height: 200px;
		opacity: 0.5;
	}
	.head-portrait {
		padding: 5px;
		position: relative;
	}
	.head-portrait-img {
		width: 120px;
		height: 150px;
		margin-bottom: -4px;
		border: 4px solid #e6e6e6;
	}
	.Basic-content {
		margin-left: 40px;
		color: #747474;
		font-size: 14px;
		padding: 10px;
		position: relative;
	}
	.Basic-content1:hover {
		border: 1px dashed #00c091;
		margin: -1px -1px -1px 39px;
	}
	.Basic-name {
		line-height: 1.5;
		font-size: 30px;
		color: #000;
		margin-bottom: 10px;
	}
	.Basic-information {
		line-height: 25px;
	}
	.p-c-listes {
		width: 95%;
		margin: 10px;
		display: flex;
	}
	.p-c-listtextarea {
		width: calc(100% - 70px);
		resize: none;
		outline: none;
		padding: 10px;
	}
}
@media screen and (max-width: 800px) {
	.head-portrait1:hover {
		border: 1px dashed #00c091;
		margin: -1px auto;
	}
	.headinput {
		width: 118px;
		height: 145px;
		position: absolute;
		top: 3px;
		z-index: 2;
		opacity: 0;
	}
	.headimg {
		width: 120px;
		height: 147px;
		position: absolute;
		top: 5px;
		background: #00c091;
		text-align: center;
		line-height: 200px;
		opacity: 0.5;
	}

	.head-portrait {
		padding: 5px;
		position: relative;
		width: 120px;
		margin: auto;
		height: 150px;
	}
	.head-portrait-img {
		border: 4px solid #e6e6e6;
		width: calc(100% - 8px);
		height: 140px;
		margin-bottom: -4px;
	}
	.Basic-content {
		color: #747474;
		font-size: 12px;
		text-align: center;
		margin: 5px 0px;
		padding: 10px;
		position: relative;
	}

	.Basic-content1:hover {
		border: 1px dashed #00c091;
		margin: 4px -1px;
	}
	.Basic-name {
		line-height: 1.5;
		font-size: 24px;
		color: #000;
		margin-bottom: 10px;
	}
	.p-c-listes {
		width: 95%;
		margin: 10px;
		display: flex;
	}
	.p-c-listtextarea {
		width: calc(100% - 135px);
		resize: none;
		outline: none;
		padding: 10px;
		margin-left: 20px;
	}
}
</style>
