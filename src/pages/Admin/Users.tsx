import React from 'react';
import { Card } from 'antd';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectFixProps } from '@/types/router';

interface PageProps extends ConnectFixProps {}

const Users: React.FC<PageProps> = (props) => {
  const { dispatch } = props;

  console.log(dispatch);

  return (
    <PageHeaderWrapper title="用户管理">
      <Card>aaa</Card>
    </PageHeaderWrapper>
  );
};

export default connect()(Users);
