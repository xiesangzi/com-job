<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
		box-sizing: border-box;
		font-size: 16px;
	}
	[v-cloak] {  
		display: none;  
	}
	.deCursor{
		cursor: pointer;
	}
</style>
