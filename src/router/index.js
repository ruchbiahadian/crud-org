import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import Login from '../views/login/Login.vue'
import listOrg from '../views/m-organization/list/ListOrg.vue'
import CreateOrg from '../views/m-organization/create/CreateOrg.vue'
import EditOrg from '../views/m-organization/existing/ExistingOrg.vue'
import ListOrgAsset from '@/views/m-organization-asset/list/ListOrgAsset.vue'
import CreateOrgAsset from '@/views/m-organization-asset/create/CreateOrgAsset.vue'
import EditOrgAsset from '@/views/m-organization-asset/existing/ExistingOrgAsset.vue'


const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      guest: true
    }
  },
  {
    path: '/',
    name: 'organization',
    component: listOrg,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/create-organization',
    name: 'create_organization',
    component: CreateOrg,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/detail-organization/:id',
    name: 'edit_organization',
    component: EditOrg,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/organization-asset',
    name: 'organization_asset',
    component: ListOrgAsset,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/create-organization-asset',
    name: 'create_organization_asset',
    component: CreateOrgAsset,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/detail-organization-asset/:id',
    name: 'detail_organization_asset',
    component: EditOrgAsset,
    meta:{
      requireAuth: true
    }
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requireAuth)){
    if(store.state.token == null){
      next('/login')
    }
  }
  if(to.matched.some(record => record.meta.guest)){
    if(store.state.token !== null){
      next('/')
    }
  }
  next();
})

export default router
