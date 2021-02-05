/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'

import { Block, Text } from '../../components'
import { format } from '../../Features/standardize'

const consoleLog = n => console.log('****** List.js -- line: ' + n + ' ******');

// khai báo props
List.propTypes = {
  item: PropTypes.object, // from parents: TabElectric.js ... TabRoom.js
};

List.defaultProps = {
  item: { id: 'mm', data: 'yyyy', price: 0 }
};

export default function List(props) {
  const { item } = props
  console.log('item:', item)
  consoleLog(22)
  return (
    <Block flex={false} row space='between' margin={[5, 0]}>
      <Block flex={false} row>
        <Text h2>{(item.date).slice(-2)}</Text>
        {/* <Text h2>Tháng</Text> */}
        <Text h2 gray> / </Text>
        <Text h2>{(item.date).slice(0, 4)}</Text>
        {/* <Text h2>Năm</Text> */}
      </Block>

      <Block flex={false} row>
        <Text h2>{(item.price).format()}</Text>
        <Text h2 gray bold> đ / {item.unit}</Text>
      </Block>
    </Block>
  );
}


