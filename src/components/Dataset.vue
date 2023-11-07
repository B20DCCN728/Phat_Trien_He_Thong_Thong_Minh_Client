<template>
    <a-table :columns="columns" :data-source="dataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <router-link :to="'/home/dataset/' + record.id"> {{ text }}</router-link>
        </template>
      </template>
      <template #title>
        <span style="font-weight: bold; font-size: 1.2rem;">Danh sách tập dữ liệu </span>
      </template>
      <template #footer>B20DCCN728 - Nguyễn Hoàng Việt</template>
    </a-table>
  </template>
  <script setup>
  import { message } from 'ant-design-vue';
  import axios from 'axios';
  import { ref, onMounted } from 'vue';

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
    },
    {
      title: 'Tên tập dữ liệu',
      dataIndex: 'name',
    },
    {
      title: 'Đường dẫn',
      className: 'column-money',
      dataIndex: 'link',
    },
    {
      title: 'Số lượng mẫu',
      dataIndex: 'quantity',
    },
  ];
  const dataSource = ref([
    {
      id: '1',
      name: 'John Brown',
      link: '￥300,000.00',
      quantity: '100',
    },
    {
      id: '1',
      name: 'John Brown',
      link: '￥300,000.00',
      quantity: '100',
    },
    {
      id: '1',
      name: 'John Brown',
      link: '￥300,000.00',
      quantity: '100',
    },
  ]);

  const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/get-all-dataset');

            dataSource.value = response.data; 


            console.log('Data fetched:', response.data); // Add this line

        } catch (error) {
            console.error('Error fetching data:', error);
            message.error('Error fetching data');
        }
    };
    
    onMounted(() => {
        fetchData();
    })
  </script>
  <style scoped>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
  </style>