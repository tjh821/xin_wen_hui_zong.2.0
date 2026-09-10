<template>
  <div class="container">
    <div class="title-banner">
      <h2>新闻汇总</h2>
    </div>

    <div class="item" v-for="news in list" :key="news.id">
      <strong>{{ news.title }}</strong>
      <p>报道时间：{{ news.createTime }}</p>
      <a :href="news.URL" target="_blank">查看原文</a>
    </div>

    <div class="block">
      <span class="demonstration">显示总数</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2,4,6]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 这一行不能少！！
import { getEmployeeList } from './api/news.js'

export default {
  name: "App",
  data() {
    return {
      page: 1,
      pageSize: 2,
      total: 0,
      list: []
//      newsList: [
//        {
//          title: "青春 “三下乡”｜深耕田野治酸化，湖科大青年以科技激活闲置耕地",
//          time: "2026-09-05 18:36:35",
//          url: "https://newxhn.voc.com.cn/portal/news/show/id/33676375.html"
//        },
//        {
//          title: "青春“三下乡”｜科技为耕地 “疗伤”，湖科大青年探索酸化土壤治理新路径",
//          time: "2026-09-05 18:10:21",
//          url: "https://newxhn.voc.com.cn/portal/news/show/id/33677730.html"
//       }
//      ],
      // 和模板 :current-page.sync="currentPage1" 名字必须一模一样！
      // 如果你是后端分页，一般还要存列表、总条数
      // list:[],
      // total:1000
    }
  },
  created(){
    this.pageQuery()
  },
  methods:{
    pageQuery() {
      const params = {page:this.page, pageSize:this.pageSize}

      getEmployeeList(params).then(res =>{
        if(res.data.code == 1){
          this.total = res.data.data.total
          this.list = res.data.data.list
        }
      }).catch(err =>{
        this.$message.error('请求出错了：' + err.message)
      })
    },
    // 每页条数改变触发（你当前固定page‑size=10，暂时不会触发）
    handleSizeChange(pageSize){
      console.log('每页条数变为：',pageSize)
      this.pageSize = pageSize
      this.pageQuery()
      // 在这里重新请求数据
    },
    // 切换页码触发【最重要！点页码就进这个方法】
    handleCurrentChange(page){
      console.log('跳转到第',page,'页')
      this.page = page
      this.pageQuery()
      // val就是新页码，在这里调用接口，获取当前页的数据
      // this.getList()
    },
    // 自己写一个获取列表数据的函数（业务核心）
    // getList(){
    //   请求参数：page=this.currentPage1，pageSize=10
    // }
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 30px auto;
  padding: 0 20px;
  font-family: "Microsoft Yahei";
}

.title-banner {
  width: 100%;
  /* 左蓝→右紫水平渐变，匹配原图色调 */
  background: linear-gradient(90deg,#637cf7,#7b4fc2);
  border-radius:24px; /*大圆角*/
  box-shadow:0 4px 18px rgba(100,80,180,0.22); /*柔和悬浮阴影*/
  padding:48px 20px;
  /* 弹性布局，文字上下两行、居中对齐 */
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:16px;

  /*====新增外边距，调整数值大小====*/
  margin-bottom:40px; 
  /*margin-top:20px;  如果需要距离顶部也留出空白，可以加上这行*/
}
.title-banner h2 {
  margin:0;
  font-size:64px;
  color:#ffffff;
  font-weight:bold;
  text-shadow: 0 2px 6px rgba(0,0,0,0.15); /*文字微弱阴影，还原原图质感*/
}
.title-banner p {
  margin:0;
  font-size:34px;
  color:#ffffff;
  opacity:0.94;
}

.item {
  background:#fff;
  border-radius:24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12),
              0 8px 24px rgba(0,0,0,0.08);
  padding:32px 24px;
  margin-bottom:30px; /* ←增大这个数值，卡片上下距离变大，20、30、40自行调整 */
}

/* ✅ 分页盒子居中 */
.block{
  margin-top:20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  color: #0052cc;
  text-decoration: none;
}
</style>