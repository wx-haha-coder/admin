import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { Card, Form, Select, Row, Col, Button, Table, Pagination, Tag } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { removeEmptyAttr } from '@/utils/utils';
import { getRegions, getCountrys, getChildRegions, GetRegionsType } from '@/services/region';
import { ConnectFixProps } from '@/types/router';

interface RegionPropsType extends ConnectFixProps {}

interface RegionItem {
  id: string;
  code: string;
  name: string;
  fullname: string;
}

interface FormValuesType {
  [name: string]: any;
}

const Region: React.FC<RegionPropsType> = (props) => {
  const {
    location: { query },
  } = props;
  const [formRef] = Form.useForm();
  const colProps = { xs: 24, sm: 12, lg: 8, xxl: 6 };
  const gutter = { lg: 24, md: 16 };
  const [counutries, setCountry] = useState([]);
  const [province, setProvince] = useState([]);
  const [cities, setCity] = useState([]);
  const [area, setArea] = useState([]);
  const [dataList, setDataList] = useState({
    page: 1,
    total: 0,
    items: [],
  });

  // 获取地区
  const getRegionData = (param?: GetRegionsType) => {
    getRegions(param).then((resp) => {
      if (resp.code === 0) {
        const { data } = resp;
        setDataList(data);
      }
    });
  };

  // 获取国家
  const getCountries = () => {
    getCountrys().then((resp) => {
      if (resp.code === 0) {
        const { data } = resp;
        setCountry(data);
      }
    });
  };

  // 搜索
  const handleSearch = (values: FormValuesType) => {
    history.push({
      pathname: '/base/regions',
      query: removeEmptyAttr(values),
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '界别',
      dataIndex: 'level',
      key: 'level',
      render: (text: number) => {
        if (text === 1) {
          return '省';
        }
        if (text === 2) {
          return '市';
        }
        if (text === 3) {
          return '县城（区域）';
        }
        return '国家';
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '全名',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '经纬度',
      dataIndex: 'longitude',
      key: 'longitude',
      render: (text: any, record: any) => {
        return (
          <span>
            <Tag>{record.longitude}</Tag>
            <Tag>{record.latitude}</Tag>
          </span>
        );
      },
    },
    {
      title: '拼音',
      dataIndex: 'pinyin',
      key: 'pinyin',
    },
  ];

  const handlePageChange = (page: number) => {
    // getRegionData({ page });
    history.push({
      pathname: '/base/regions',
      query: {
        page,
      },
    });
  };

  const handleChangeFilter: (type: string) => (code: string) => void = (type: string) => {
    function setList(data?: never[]) {
      let arr: never[] = [];
      if (data) {
        arr = [...data];
      }

      switch (type) {
        case 'p':
          setProvince(arr);
          break;
        case 'c':
          setCity(arr);
          break;
        case 'a':
          setArea(arr);
          break;
        default:
          break;
      }
    }
    return (code: string) => {
      if (!code) {
        // setList();
        return;
      }
      getChildRegions({ code }).then((resp) => {
        if (resp.code === 0) {
          setList(resp.data);
        }
      });
    };
  };

  useEffect(() => {
    getRegionData(query);
  }, [query]);

  useEffect(() => {
    getCountries();
  }, []);

  console.log('????dddd');
  const FilterForm = () => {
    return (
      <Form className="serach-from-default" onFinish={handleSearch} form={formRef}>
        <Row gutter={gutter}>
          <Col {...colProps}>
            <Form.Item label="国家" name="country">
              <Select
                placeholder="国家"
                onChange={handleChangeFilter('p')}
                allowClear
                showSearch
                // optionFilterProp="children"
              >
                {(counutries || []).map((ele: RegionItem) => (
                  <Select.Option key={ele.id} value={ele.code}>
                    {ele.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item label="省" name="province">
              <Select
                placeholder="省"
                allowClear
                showSearch
                // optionFilterProp="children"
                onChange={handleChangeFilter('c')}
              >
                {province.map((ele: RegionItem) => (
                  <Select.Option key={ele.id} value={ele.code}>
                    {ele.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item label="市" name="city">
              <Select
                placeholder="市"
                allowClear
                showSearch
                optionFilterProp="children"
                onChange={handleChangeFilter('a')}
              >
                {cities.map((ele: RegionItem) => (
                  <Select.Option key={ele.id} value={ele.code}>
                    {ele.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item label="县(区域)" name="area">
              <Select placeholder="县(区域)" allowClear showSearch optionFilterProp="children">
                {area.map((ele: RegionItem) => (
                  <Select.Option key={ele.id} value={ele.code}>
                    {ele.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" className="search-btn-group">
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button htmlType="reset">重置</Button>
        </Row>
      </Form>
    );
  };

  return (
    <PageHeaderWrapper>
      <Card style={{ marginBottom: 15 }}>
        <FilterForm />
      </Card>
      <Card>
        <Table columns={columns} dataSource={dataList.items} rowKey="id" pagination={false} />
        <Pagination
          className="global-pagination-default"
          total={dataList.total}
          current={dataList.page}
          pageSize={15}
          onChange={handlePageChange}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default Region;
