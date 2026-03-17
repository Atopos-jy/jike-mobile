import "./style.css";
import { Tabs } from "antd-mobile";
import { useTabs } from "../../hooks/useTabs";
import HomeList from "./HomeList";
const Home = () => {
  const { channels } = useTabs();
  return (
    <div>
      <div className="tabContainer">
        {/* tab区域 */}
        <Tabs defaultActiveKey={"0"}>
          {channels.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              {/* list组件 */}
              {/* 严格控制滚动盒子 */}
              <div className="listContainer">
                <HomeList channelId={"" + item.id} />
              </div>
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
