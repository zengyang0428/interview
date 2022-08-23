<template>
	<el-form  label-width="100px" :model="form" :inline="inline">
		<el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
			<el-input v-if="item.type === 'input'" :placeholder="'请输入' + item.label" v-model="form[item.model]">
			</el-input>
			<el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
			<el-date-picker v-if="item.type === 'date'" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"
				v-model="form[item.model]"></el-date-picker>
			<el-select v-if="item.type === 'select'" placeholder="请选择" v-model="form[item.model]">
				<el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-cascader v-if="item.type === 'addr'" :key="item.value" v-model="form[item.model]" :options="options">
			</el-cascader>
		</el-form-item>
		<el-form-item>
			<slot>

			</slot>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	props: {
		formLabel: Array,
		form: Object,
		inline: Boolean
	},
	data() {
		return {
			options: [{
				value: '广东省',
				label: '广东省',
				children: [{
					value: '广州市',
					label: '广州市',
					children: [{
						value: '越秀区',
						label: '越秀区'
					}, {
						value: '荔湾区',
						label: '荔湾区'
					}, {
						value: '海珠区',
						label: '海珠区'
					}, {
						value: '天河区',
						label: '天河区'
					},
					{
						value: '白云区',
						label: '白云区'
					},
					{
						value: '黄埔区',
						label: '黄埔区'
					},
					{
						value: '番禺区',
						label: '番禺区'
					},
					{
						value: '花都区',
						label: '花都区'
					},
					{
						value: '南沙区',
						label: '南沙区'
					},
					{
						value: '增城区',
						label: '增城区'
					},
					{
						value: '从化区',
						label: '从化区'
					},
					]
				}]
			}]
		}
	}
}

</script>

<style lang="scss" scoped>
</style>