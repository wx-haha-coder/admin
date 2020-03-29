import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Setting: React.FC<{}> = (props: any) => {
  console.log(props);
  return (
    <PageHeaderWrapper>
      <div>系统设置</div>
    </PageHeaderWrapper>
  );
};

export default Setting;
