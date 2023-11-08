<template>
    <a-layout>
      <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        :style="{  height: '1700' }"
      >
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="1">
            <user-outlined />
            <router-link to="/home/dataset">Quản lí mẫu</router-link>
            <!-- <span class="nav-text">Quản lí mẫu</span> -->
          </a-menu-item>
          <a-menu-item key="2">
            <video-camera-outlined />
            <router-link to="">Quản lí nhãn</router-link>
            <!-- <span class="nav-text">Quản lí nhãn</span> -->
          </a-menu-item>
          <a-menu-item key="3">
            <upload-outlined />
            <router-link to="/home/model">Quản lí model</router-link>
            <!-- <span class="nav-text">Quản lí model</span> -->
          </a-menu-item>
          <a-menu-item key="4">
            <user-outlined />
            <router-link to="">Xử lí thông minh</router-link>
            <!-- <span class="nav-text">Xử lí thông minh</span> -->
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!-- <a-layout-header :style="{ background: '#fff', padding: 0 }" /> -->
        <!-- <a-layout-header :style="{ background: '#fff', padding: 0, position: 'fixed', width: '100%', zIndex: 1 }" /> -->
        <a-layout-content :style="{ margin: '24px 16px 0' }">    
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
              <!-- <Table /> -->
              <router-view></router-view>
            </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Phát triển hệ thống thông minh ©2023 Created by Nguyễn Hoàng Việt
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </template>
  <script setup>
  import { ref } from 'vue';
  // import Table from './Table.vue';
  const onCollapse = (collapsed, type) => {
    console.log(collapsed, type);
  };
  const onBreakpoint = broken => {
    console.log(broken);
  };
  const selectedKeys = ref(['1']);
  </script>
  <style scoped>
  #components-layout-demo-responsive .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
  
  .site-layout-sub-header-background {
    background: #fff;
  }
  
  .site-layout-background {
    background: #fff;
  }
  
  [data-theme='dark'] .site-layout-sub-header-background {
    background: #141414;
  }
  </style>