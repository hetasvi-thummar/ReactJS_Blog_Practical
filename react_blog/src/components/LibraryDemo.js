import React, { useState } from "react";
import {
  Fade,
  Flip,
  Rotate,
  Zoom,
  Bounce,
  Slide,
  Roll,
  LightSpeed,
  Reveal,
  Jump,
  Flash,
  Swing,
  Tada,
  RubberBand,
  Spin,
  Shake,
  HeadShake,
  Jello,
  Pulse,
  Wobble,
} from "react-reveal";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import classnames from "classnames";

const LibraryDemo = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Fade
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Flip
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Rotate
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            Zoom
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
          >
            Bounce
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "6" })}
            onClick={() => {
              toggle("6");
            }}
          >
            Slide
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "7" })}
            onClick={() => {
              toggle("7");
            }}
          >
            Roll
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "8" })}
            onClick={() => {
              toggle("8");
            }}
          >
            LightSpeed
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "9" })}
            onClick={() => {
              toggle("9");
            }}
          >
            Custom CSS
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "10" })}
            onClick={() => {
              toggle("10");
            }}
          >
            Jump
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "11" })}
            onClick={() => {
              toggle("11");
            }}
          >
            Flash
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "12" })}
            onClick={() => {
              toggle("12");
            }}
          >
            HeadShake
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "13" })}
            onClick={() => {
              toggle("13");
            }}
          >
            Jello
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "14" })}
            onClick={() => {
              toggle("14");
            }}
          >
            Pulse
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "15" })}
            onClick={() => {
              toggle("15");
            }}
          >
            RubberBand
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "16" })}
            onClick={() => {
              toggle("16");
            }}
          >
            Shake
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "17" })}
            onClick={() => {
              toggle("17");
            }}
          >
            Spin
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "18" })}
            onClick={() => {
              toggle("18");
            }}
          >
            Swing
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "19" })}
            onClick={() => {
              toggle("19");
            }}
          >
            Tada
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "20" })}
            onClick={() => {
              toggle("20");
            }}
          >
            Wobble
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Fade left>
            <h1>React Reveal</h1>
          </Fade>
        </TabPane>
        <TabPane tabId="2">
          <Flip>
            <h1>React Reveal</h1>
          </Flip>
        </TabPane>
        <TabPane tabId="3">
          <Rotate top left>
            <h1>React Reveal</h1>
          </Rotate>
        </TabPane>
        <TabPane tabId="4">
          <Zoom left>
            <h1>React Reveal</h1>
          </Zoom>
        </TabPane>
        <TabPane tabId="5">
          <Bounce left>
            <h1>React Reveal</h1>
          </Bounce>
        </TabPane>
        <TabPane tabId="6">
          <Slide left>
            <h1>React Reveal</h1>
          </Slide>
        </TabPane>
        <TabPane tabId="7">
          <Roll left>
            <h1>React Reveal</h1>
          </Roll>
        </TabPane>
        <TabPane tabId="8">
          <LightSpeed left>
            <h1>React Reveal</h1>
          </LightSpeed>
        </TabPane>
        <TabPane tabId="9">
          <Reveal effect="fadeInUp">
            <h1>React Reveal</h1>
          </Reveal>
        </TabPane>
        {/* <TabPane tabId="10">
          <Jump>
            <h1>React Reveal</h1>
          </Jump>
        </TabPane> */}
        {/* <TabPane tabId="11">
          <Flash>
            <h1>React Reveal</h1>
          </Flash>
        </TabPane> */}
        {/* <TabPane tabId="12">
          <HeadShake>
            <h1>React Reveal</h1>
          </HeadShake>
        </TabPane>
        <TabPane tabId="13">
          <Jello>
            <h1>React Reveal</h1>
          </Jello>
        </TabPane>
        <TabPane tabId="14">
          <Pulse>
            <h1>React Reveal</h1>
          </Pulse>
        </TabPane>
        <TabPane tabId="15">
          <RubberBand>
            <h1>React Reveal</h1>
          </RubberBand>
        </TabPane>
        <TabPane tabId="16">
          <Shake>
            <h1>React Reveal</h1>
          </Shake>
        </TabPane> */}
        {/* <TabPane tabId="17">
          <Spin>
            <h1>React Reveal</h1>
          </Spin>
        </TabPane>
        <TabPane tabId="18">
          <Swing>
            <h1>React Reveal</h1>
          </Swing>
        </TabPane>
        <TabPane tabId="19">
          <Tada>
            <h1>React Reveal</h1>
          </Tada>
        </TabPane>
        <TabPane tabId="20">
          <Wobble>
            <h1>React Reveal</h1>
          </Wobble>
        </TabPane> */}
      </TabContent>
    </Container>
  );
};

export default LibraryDemo;
