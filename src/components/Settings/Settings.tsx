import React, { useState, useCallback, useRef } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';
import './Settings.scss';
import { useStorage } from 'utilities/Storage';

// Original: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list

import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
import { useGesture } from 'react-with-gesture';
import { useSprings, animated, interpolate } from 'react-spring';
// import './styles.css'

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? { y: curIndex * 10 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false };

function DraggableList({ items }) {
  // Store indicies as a local ref, this represents the item order
  const order = useRef(items.map((_, index) => index));
  // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const [springs, setSprings] = useSprings(items.length, fn(order.current));
  // Preps a gesture handler which returns drag-deltas, touched/clicked state, etc.
  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    // Bunch of math to calculate current row and new order, it's unavoidable ¯\_(ツ)_/¯
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1);
    const newOrder = swap(order.current, curIndex, curRow);
    // Feed springs new style data, they'll animate the view without causing a single render
    setSprings(fn(newOrder, down, originalIndex, curIndex, y));
    if (!down) order.current = newOrder;
  });
  // Map resulting animated values to the actual items
  return (
    <div className="content" style={{ height: items.length * 100 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`),
          }}
          children={items[i]}
        />
      ))}
    </div>
  );
}

export interface Props {
  show: boolean;
  toggle(): void;
}

class Item extends React.Component<any> {
  render() {
    return (
      <ListGroupItem>
        {this.props.item} <span {...this.props.dragHandleProps}>yo</span>
      </ListGroupItem>
    );
  }
}
export default function Settings({ show, toggle }: Props) {
  const [watchList, setWatchList] = useStorage('stock-list', []);
  console.log(watchList);

  return (
    <Modal isOpen={show} toggle={toggle} className="settings-modal">
      <ModalHeader toggle={toggle} id="title">
        Settings
      </ModalHeader>
      <ModalBody>
        <section>
          <h6>Watch list</h6>
          <ListGroup>
            <DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />
          </ListGroup>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Watch list</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
            </FormGroup>
          </Form>
        </section>
      </ModalBody>
    </Modal>
  );
}
