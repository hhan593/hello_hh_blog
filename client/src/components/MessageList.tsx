import { useEffect, useState } from "react";
import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
const MessageList = ({ setMessage }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`
    )
      .then((res) => res.json())
      .then((res) => {
        const results = Array.isArray(res) ? res : [];
        setData([...data, ...results]);
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div
      className="h-full overflow-auto min-h-0 px-2 border-b-2 border-gray-200"
      style={{ height: "100%", overflow: "auto" }}
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.email}
              onClick={() => {
                setMessage(item);
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href="#">{item.name}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default MessageList;
