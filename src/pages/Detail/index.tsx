import { NavBar } from "antd-mobile";
import { useEffect, useState } from "react";
import { type DetailDataType, fetchDetailAPI } from "@/api/detail";
import { useNavigate, useSearchParams } from "react-router-dom";
const Detail = () => {
  const [detail, setDetail] = useState<DetailDataType | null>(null);
  const [params] = useSearchParams();
  const id = params.get("id");
  useEffect(() => {
    async function getDetail() {
      try {
        const res = await fetchDetailAPI(id!);
        console.log(res);

        setDetail(res.data);
      } catch (error) {
        console.log(error);

        throw new Error("fetch detail error");
      }
    }
    if (id) {
      getDetail();
    }
  }, [id]);
  const navigate = useNavigate();
  const back = () => navigate(-1);

  if (!detail) {
    return <div>this is loading</div>;
  }
  return (
    <div>
      <NavBar onBack={back}>{detail.title}</NavBar>
      <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>
    </div>
  );
};

export default Detail;
