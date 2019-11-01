<template>
	<div>
		请求公司信息： {{ conpanyinfo }}
		<p />
		store中取用户信息：openId={{ $store.getters.openId }},name={{ $store.getters.name }},tenantId={{ $store.getters.tenantId }}<br />
		{{$store.getters.token}}
	</div>
</template>

<script>
import { getCompany } from '@/api/company';

export default {
	
	data() {
		return {
			conpanyinfo: '',
		};
	},
	created() {
		this.loadInfo();
		this.getInfoByStore();
	},
	methods: {
		loadInfo() {
			getCompany().then(res => {
				this.conpanyinfo = JSON.stringify(res.data);
			});
		},
		getInfoByStore() {
			console.log(this.$store.getters.name);
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
				alert('submit!')
				} else {
				return false
				}
			})
		}
		
	}
};
</script>
