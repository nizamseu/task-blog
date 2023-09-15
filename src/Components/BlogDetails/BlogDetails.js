import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function BlogDetails() {
  const [data, setData] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const createdTime = new Date(data?.created_at);
  const formattedTime = createdTime.toLocaleString();

  useEffect(() => {
    if (id) {
      loadBlog();
    }
  }, [id]);

  const loadBlog = async () => {
    await axios.get(`/api/v1/blog/${id}/`).then((res) => {
      setData(res?.data?.results);
    });
  };
  function getTimeAgoString(created_at) {
    const currentDate = new Date();
    const createdAtDate = new Date(created_at);

    const timeDiffInSeconds = Math.floor((currentDate - createdAtDate) / 1000);

    if (timeDiffInSeconds < 60) {
      return "Just now";
    } else if (timeDiffInSeconds < 60 * 60) {
      const minutesAgo = Math.floor(timeDiffInSeconds / 60);
      return `${minutesAgo} ${minutesAgo > 1 ? "minutes" : "minute"} ago`;
    } else if (timeDiffInSeconds < 60 * 60 * 24) {
      const hoursAgo = Math.floor(timeDiffInSeconds / (60 * 60));
      return `${hoursAgo} ${hoursAgo > 1 ? "hours" : "hour"} ago`;
    } else if (timeDiffInSeconds < 60 * 60 * 24 * 10) {
      const daysAgo = Math.floor(timeDiffInSeconds / (60 * 60 * 24));
      return `${daysAgo} ${daysAgo > 1 ? "days" : "day"} ago`;
    } else {
      // show the actual date if it's more than 10 days ago
      return createdAtDate.toLocaleString();
    }
  }
  const theObj = { __html: data?.content };

  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {data?._id ? (
        <div className="max-w-7xl mx-auto">
          <div className="my-10 mx-4">
            <img
              src={data?.thumbnail}
              alt=""
              className="h-[12rem] md:h-[30rem] w-full object-cover rounded-lg"
            />

            <div className="my-4">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-4 items-center">
                  <div className="py-4">
                    <img
                      src={`https://thumbs.dreamstime.com/z/user-sign-icon-person-symbol-human-avatar-rich-man-84519083.jpg`}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </div>

                  <h2 className="text-gray-800 text-xl">
                    Admin
                    <span className="ml-2 text-xs italic">
                      {getTimeAgoString(data?.createdAt)}
                      {/* {formattedTime} */}
                    </span>
                  </h2>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold">{data?.title}</h2>
                </div>

                <div dangerouslySetInnerHTML={theObj}>
                  {/* <p className="text-justify">{data?.content}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" absolute left-0 top-[30%]  flex justify-center items-center  w-full z-20">
          {" "}
          <RotatingLines
            strokeColor="#000"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
    </>
  );
}
