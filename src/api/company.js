import request from '@/utils/request'
export function getCompany() {
	return request({
		url: '/api/etp/enterprise/info',
		method: 'get'
	})
}
export function regiter(data) {
	if (data.type == "企业") {
		return request({
			url: '/api/etp/user/register',
			method: 'post',
			data: data
		})
	} else {
		return request({
			url: '/api/hgz/schuser/register',
			method: 'post',
			data: data
		})
	}

}
export function editCompany(data) {
	return request({
		url: '/api/etp/enterprise/info',
		method: 'put',
		data: data
	})
}
export function submitCompany(data) {
	return request({
		url: '/api/etp/enterprise/auth',
		method: 'post',
		data: data
	})
}
export function jobList(data) {
	return request({
		url: '/api/etp/jobrec/page',
		method: 'get',
		params: data
	})
}
export function addJob(data) {
	return request({
		url: '/api/etp/jobrec',
		method: 'post',
		data: data
	})
}
export function editJob(data) {
	return request({
		url: '/api/etp/jobrec/' + data.id,
		method: 'put',
		data: data
	})
}
export function jobStatus(dataid, data) {
	return request({
		url: '/api/etp/jobrec/publish/' + dataid.id,
		method: 'post',
		params: data
	})
}
export function employList(data) {
	return request({
		url: '/api/etp/jobrec/candidates',
		method: 'get',
		params: data
	})
}
export function employUserList(para, data) {
	return request({
		url: '/api/etp/jobapp/applicant/' + para.id,
		method: 'get',
		params: data
	})
}

export function cooperationList(data) {
	return request({
		url: '/api/etp/cooperation/page',
		method: 'get',
		params: data
	})
}
export function resumeInfo(data) {
	return request({
		url: '/api/etp/talent/resume',
		method: 'get',
		params: data
	})
}

export function baseInfo(data) {
	return request({
		url: '/api/etp/talent/edit/1',
		method: 'post',
		data: data
	})
}
export function workExpected(data) {
	return request({
		url: '/api/etp/talent/edit/2',
		method: 'post',
		data: data
	})
}
export function educationInfo(data) {
	return request({
		url: '/api/etp/talent/edit/3',
		method: 'post',
		data: data
	})
}
export function workHistoryInfo(data) {
	return request({
		url: '/api/etp/talent/edit/4',
		method: 'post',
		data: data
	})
}
export function projectExpsInfo(data) {
	return request({
		url: '/api/etp/talent/edit/5',
		method: 'post',
		data: data
	})
}
export function addCooper(data) {
	return request({
		url: '/api/etp/cooperation',
		method: 'post',
		data: data
	})
}
export function editCooper(data) {
	return request({
		url: '/api/etp/cooperation/' + data.id,
		method: 'put',
		data: data
	})
}
export function delCooper(data) {
	return request({
		url: '/api/etp/cooperation/' + data.id,
		method: 'DELETE'
	})
}
export function resumeScore(obgId, data) {
	return request({
		url: '/api/etp/jobapp/mark/' + obgId.id,
		method: 'post',
		params: data
	})
}
// 没收藏上
export function resumecollect(obgId) {
	return request({
		url: '/api/etp/collect/resume/' + obgId.id,
		method: 'post'
	})
}

export function collectList(data) {
	return request({
		url: '/api/etp/collect/mine',
		method: 'get',
		params: data
	})
}
export function getCode(data) {
	return request({
		url: '/api/etp/user/code',
		method: 'post',
		params: data
	})
}
export function checkCode(data) {
	return request({
		url: '/api/etp/user/checkCode',
		method: 'post',
		params: data
	})
}
export function changeAdmin(data) {
	return request({
		url: '/api/etp/user/changeAdmin',
		method: 'post',
		params: data
	})
}
export function getAdmin() {
	return request({
		url: '/api/etp/user/masterAdmin',
		method: 'get'
	})
}

