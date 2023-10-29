<template>
  <!-- Sample Header -->
    <div>
      <a-descriptions title="Quản lí mẫu">
        <a-descriptions-item label="Mẫu">Bàn tay</a-descriptions-item>
        <a-descriptions-item label="Đường dẫn ảnh">Là đường dẫn của ảnh để train trong hệ thống</a-descriptions-item>
        <a-descriptions-item label="Số lượng">{{ dataSource.length }}</a-descriptions-item>
        <a-descriptions-item label="Trạng thái">Ok</a-descriptions-item>
        <a-descriptions-item label="Đường dẫn tệp gán nhãn">Là đường dẫn của tệp chứa các thông số gán nhãn</a-descriptions-item>
      </a-descriptions>
    </div>

    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
    <a-table bordered :data-source="dataSource" :columns="columns" size="100%">
      <template #bodyCell="{ column, text, record }">
        <!-- Title column -->
        <template v-if="column.dataIndex === 'name'">
          <div class="editable-cell">
            <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record.id].name" @pressEnter="save(record.id)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.id)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
            </div>
          </div>
        </template>
          <!-- Description column -->
        <template v-if="column.dataIndex === 'validDate'">
          <div class="editable-cell">
            <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record.id].validDate" @pressEnter="save(record.id)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.id)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
            </div>
          </div>
        </template>
        <!-- owner_id column -->
        <template v-if="column.dataIndex === 'link_img'">
          <div class="editable-cell">
            <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record.id].link_img" @pressEnter="save(record.id)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.id)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
            </div>
          </div>
        </template>
        <!-- map -->
        <template v-if="column.dataIndex === 'link_map'">
          <div class="editable-cell">
            <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record.id].link_map" @pressEnter="save(record.id)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.id)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
            </div>
          </div>
        </template>
        <!-- label -->
        <template v-if="column.dataIndex === 'label'">
          <div class="editable-cell">
            <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record.id].label.name" @pressEnter="save(record.id)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.id)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text.name || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
            </div>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="onDelete(record.id)"
          >
            <a>Delete</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </template>
  <script setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  // import type { Ref, UnwrapRef } from 'vue';
  import message from 'ant-design-vue/es/message';
  import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
  import { cloneDeep } from 'lodash-es';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  // Config columns 
  const columns = [
    {
      title: 'Tên mẫu',
      dataIndex: 'name',
      filters: [
        {
          text: 'Hand',
          value: 'hand',
        }
      ],
      filterSearch: true,
    },
    {
      title: 'Ngày thêm',
      dataIndex: 'validDate',
      sorter: (a, b) => a.validDate - b.validDate,
    },
    {
      title: 'Đường dẫn ảnh',
      dataIndex: 'link_img',
    },
    {
      title: 'Đường dẫn tệp gán nhãn',
      dataIndex: 'link_map',
    },
    {
      title: 'Nhãn',
      dataIndex: 'label',
    },
    {
      title: 'Thao tác',
      dataIndex: 'operation',
    },
  ];
  

  const dataSource = ref([]);

  const count = computed(() => dataSource.value.length + 1);
  const editableData = reactive({});
  const edit = key => {
    console.log('key', key);
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.id)[0]);
  }

  const updateRecord = async (key) => {

    try {
      // Get the updated data from editableData[key]
      const updatedData = editableData[key];
      // Send a PUT or PATCH request to update the record
      const response = await axios.put(`http://127.0.0.1:8000/sample/${key}`, updatedData);
      console.log('Record updated:', response.data); // Optional
    } catch (error) {
      console.error('Error updating record:', error);
      // Handle error appropriately (e.g., show an error message)
    }

  };

  const save = key => {
    try {
      // Update the record data in the editableData object
      updateRecord(key);
      fetchData();
      // Clear the editableData object
      delete editableData[key];
    } catch (error) {
      console.error('Error updating record:', error);
      // Handle error appropriately (e.g., show an error message)
    }
    // Object.assign(dataSource.value.filter(item => key === item.id)[0], editableData[key]);
    // delete editableData[key];
  };

  const onDelete = async (key) => {
    try {
      // Send an HTTP DELETE request to delete the record
        axios
          .delete(`http://127.0.0.1:8000/sample/${key}`)
          .then((response) => {
            message.success('Đã xóa mẫu thành công' + JSON.stringify(response.data));
          })
          .catch((error) => {
            message.error('Lỗi xóa mẫu ' + error.message);
          });

      // After successful deletion, update the data or refetch
      fetchData(); // or update your ref-based data
    
    } catch (error) {
      console.error('Error deleting record:', error);
      // Handle error appropriately (e.g., show an error meujssage)
    }
    dataSource.value = dataSource.value.filter(item => item.id !== key);
  };

  const router = useRouter();
  const handleAdd = () => { 
    router.push('./add');
    // const newData = {
    //   key: `${count.value}`,
    //   name: `Edward King ${count.value}`,
    //   age: 32,
    //   address: `London, Park Lane no. ${count.value}`,
    // };
    // dataSource.value.push(newData);
  };

  // Fetch dataset from server 
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/sample/all');
      dataSource.value = response.data; // Replace dataSource with the fetched data

      console.log('Data fetched:', response.data); // Add this line
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Save data to server



  onMounted(() => {
    fetchData();
  });

  </script>
  <style lang="less" scoped>
  .editable-cell {
    position: relative;
    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
      padding-right: 24px;
      max-width: 250px;
    }
  
    .editable-cell-text-wrapper {
      padding: 5px 24px 5px 5px;
    }
  
    .editable-cell-icon,
    .editable-cell-icon-check {
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;
    }
  
    .editable-cell-icon {
      margin-top: 4px;
      display: block;
    }
  
    .editable-cell-icon-check {
      line-height: 28px;
    }
  
    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
      color: #108ee9;
    }
  
    .editable-add-btn {
      margin-bottom: 8px;
    }
  }
  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }
  </style>