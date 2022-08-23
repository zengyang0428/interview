<template>
	<div class="manage">
		<el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
			<ComFrom :formLabel="opertateFormLabel" :form="operateForm" :inline="true" ref="form">
			</ComFrom>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>
		<div class="manage-header">
			<div>
				<el-button type="primary" @click="adduser">+新增</el-button>
				<el-button type="primary" @click="revoke">撤回</el-button>
			</div>
			<ComFrom :formLabel="formLabel" :form="searchFform" :inline="true" ref="form">
				<el-button type="primary" @click="query(searchFform.keyword)">搜索</el-button>
			</ComFrom>
		</div>
		<compTable :tableData="tableData" :tableLabel="tableLabel" :config="config" @edit="editUser" @del="delUser">
		</compTable>
	</div>
</template>

<script>
import ComFrom from '../../components/CompoenFrom.vue';
import compTable from '../../components/compoenTable.vue';
import uuidv1 from "uuid/v1"
import { setToken, getToken } from '../../assembly/setToken'
export default {
	components: {
		ComFrom,
		compTable
	},
	data() {
		return {
			id: uuidv1(),
			operateType: 'add',
			isShow: false,
			opertateFormLabel: [
				{
					model: 'name',
					label: '姓名',
					type: 'input'
				},
				{
					model: 'age',
					label: '年龄',
					type: 'input'
				},
				{
					model: 'sex',
					label: '性别',
					type: 'select',
					opts: [
						{
							label: '男',
							value: 1
						},
						{
							label: '女',
							value: 0
						}
					]
				},
				{
					model: 'birth',
					label: '出生日期',
					type: 'date'
				},
				{
					model: 'addr',
					label: '地址',
					type: 'addr'
				}
			],
			operateForm: [],
			formLabel: [
				{
					model: "keyword",
					label: '',
					type: 'input'
				}
			],
			searchFform: {
				keyword: ''
			},
			tableData: [
			],
			tableLabel: [
				{
					prop: "name",
					label: "姓名",
				},
				{
					prop: "age",
					label: "年龄",
				},
				{
					prop: "sex",
					label: "性别",
				},
				{
					prop: "birth",
					label: "出生日期",
					width: 200
				},
				{
					prop: "addr",
					label: "地址",
					width: 320
				}
			],
			config: {
				loading: null,
				page: 1,
				total: 20,
				name: null
			}

		}
	},
	mounted() {
		if (JSON.parse(getToken("tableData")) === null) {
			return this.tableData = []
		} else {
			this.tableData = JSON.parse(getToken("tableData"))
		}
	},
	created() {
		this.thisdata()
	},
	methods: {
		thisdata() {

		},
		//撤销
		revoke() {
			this.tableData = JSON.parse(getToken("backups"))
		},
		//搜索
		query(name = '') {
			if (name === '') {
				return this.tableData
			}
			this.tableData = this.tableData.filter(tb => {
				console.log(this.searchFform.keyword)
				return (tb.name === this.searchFform.keyword);
			})
		},
		//增加。修改
		confirm() {
			if (this.operateType === 'edit') {
				let i = this.operateForm.addr.join("-")
				this.operateForm.addr = i
				if (this.operateForm.sex === 1) {
					this.operateForm.sex = "男"
				} else {
					this.operateForm.sex = "女"
				}
				this.isShow = false
				this.tableData.unshift(this.tableData.splice(this.tableData.findIndex(item => item.id === this.operateFor.id), 1))
				setToken("tableData", JSON.stringify(this.tableData))
				console.log("2");

			} else {
				let i = this.operateForm.addr.join("-")
				this.operateForm.addr = i
				this.operateForm.id = uuidv1()
				if (this.operateForm.sex === 1) {
					this.operateForm.sex = "男"
				} else {
					this.operateForm.sex = "女"
				}
				console.log(this.operateForm.sex);
				this.tableData.unshift(this.operateForm)
				console.log(this.tableData);
				this.thisdata()
				setToken("tableData", JSON.stringify(this.tableData))
				this.isShow = false


			}
		},
		adduser() {
			this.isShow = true
			this.operateType = 'add'
			this.operateForm = {
				name: '',
				addr: '',
				age: '',
				birth: '',
				sex: '',
			}

		},
		editUser(row) {
			console.log(row);
			this.operateType = 'edit'
			this.isShow = true
			this.operateForm = row
		},
		//删除
		delUser(row) {
			console.log(row.id);
			setToken("backups", JSON.stringify(this.tableData))
			this.$confirm("此操作将删除改文件,撤回也只能撤一次,是否继续", "提示", {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				let i = this.tableData.splice(this.tableData.findIndex(item => item.id === row.id), 1)
				setToken("tableData", JSON.stringify(i))
			})
		},

	},
}
</script>

<style lang="less" scoped>
.manage-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>