<template>
    <div class="button">
        <a-button class="train" type="primary" @click="train('new-model')" danger>Train mới mô hình</a-button>
        <a-button class="retrain" type="primary" @click="train('retrain-coco17')" danger>Train lại ssd_mobilenet_v2_fpnlite_320x320_coco17_tpu-8</a-button>
    </div>
    <a-table :columns="columns" :data-source="dataSource" bordered size="100%" :scroll="{ x: 1200 }">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <a> {{ text }}</a>
        </template>
        <!-- <template v-if="column.dataIndex === 'quantity'">
          <p> {{ record.samples.length }} </p>
        </template> -->
        <template v-if="column.dataIndex === 'retrain'">
            <a-button class="retrain" @click="train(record.id)" type="primary" danger>Retrain</a-button>
        </template>
      </template>
      <template #title>
        <span style="font-weight: bold; font-size: 1.2rem;">Danh sách mô hình đã đào tạo </span>
      </template>
      <template #footer>B20DCCN728 - Nguyễn Hoàng Việt</template>
    </a-table>
  </template>
  <script setup>
  import { message } from 'ant-design-vue';
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
    },
    {
      title: 'Tên mô hình',
      dataIndex: 'name',
    },
    {
      title: 'Đường dẫn',
      className: 'column-money',
      dataIndex: 'link',
    },
    {
      title: 'Tên thuật toán',
      dataIndex: 'modelName',
    },
    {
      title: 'Accuracy',
      dataIndex: 'acc',
    },
    {
      title: 'Precision',
      dataIndex: 'pre',

    },
    {
      title: 'Recall',
      dataIndex: 're',
    },
    {
      title: 'F1 Score',
      dataIndex: 'f1',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'validDate',
    },
    {
      title: 'Retrain',
      dataIndex: 'retrain',
    },
  ];

  const train = key => {
    router.push(`./model/${key}`);
  };

  const dataSource = ref();

  const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/get-all-model');

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
  <style lang="less" scoped>
  th.column-money,
  td.column-money {
    text-align: right !important;
    /* padding: 1px; */
  }

    .button {
        margin-bottom: 10px;
    }

  .button .train {
    margin-right: 10px;
  }
  
  .button .retrain {
    margin-right: 10px;
  }         

  </style>