import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../util/Loader";

export default function HomePage() {
  const [blogsobj, setBlogobj] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { query } = router.query;
  const [serachText, setSerachText] = useState(query);

  console.log(query);
  useEffect(() => {
    retrive_blog();
  }, []);

  async function retrive_blog() {
    setIsLoading(true);
    await axios
      .get(`/api/v1/blog/blog/`)
      .then((res) => {
        setIsLoading(false);
        // setBlogobj(res?.data?.results);
        setBlogobj(res?.data?.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (query) {
      findBlog();
    }
  }, [query]);

  async function findBlog() {
    setIsLoading(true);
    await axios
      .get(`/api/v1/blog/find_blog/?query=${query}`)
      .then((res) => {
        setIsLoading(false);

        setBlogobj(res?.data?.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  const handleSearch = (e) => {
    // setSerachText(e);
    router.push({
      pathname: "/",
      query: { query: e },
    });
  };
  const handleSearchBTN = () => {
    findBlog();
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blog</title>
      </Head>
      <div className="max-w-7xl mx-auto my-10">
        <div className="pt-4">
          <h3 className="text-center text-md md:text-2xl font-semibold font-sans">
            The Power of Knowledge: Exploring Diverse Subjects in Education
          </h3>
          <p className="text-center py-2 text-gray-600 text-sm md:text-basic ">
            Search to learn about new topics, technologies, and others
          </p>

          <div className="max-w-lg md:max-w-xl mx-auto py-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => handleSearch(e?.target?.value)}
                value={query}
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-900 focus:border-gray-900 "
                placeholder="Search here"
                required
              ></input>
              <button
                onClick={handleSearchBTN}
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-black hover:bg-gray-800 focus:ring-3 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-4 py-2 "
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* recent */}
        {/* <div className="mx-4 my-6">
          <h3 className="font-semibold">Recent blog posts</h3>

          <div className="grid grid-rows-1 md:grid-rows-3 md:grid-flow-col gap-4 my-4">
            <div className="col-span-2 row-span-3 ">
              <div>
                <div>
                  <img
                    src="/go.png"
                    alt=""
                    className="rounded-lg h-[26.5rem] object-cover"
                  />
                </div>
                <div className="my-4">
                  <div className="flex flex-col space-y-2">
                    <div>
                      <p className="text-sm text-gray-700">
                        Sium Hossain, 20 Jan 2023
                      </p>
                    </div>

                    <div>
                      <h3 className="text-basic md:text-lg font-semibold break-all  ">
                        Introduction on go
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quam iusto quo est quidem laboriosam ex molestiae
                        tenetur deserunt et harum quod obcaecati esse error a
                        aut, minus ratione, doloremque consectetur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 ">
              <div className="flex flex-col md:flex-row space-x-4 ">
                <div>
                  <img
                    src="/go.png"
                    alt=""
                    className="rounded-lg w-[48rem] h-[14rem] object-cover"
                  />
                </div>
                <div className="my-4">
                  <div className="flex flex-col space-y-2">
                    <div>
                      <p className="text-sm text-gray-700">
                        Sium Hossain, 20 Jan 2023
                      </p>
                    </div>

                    <div>
                      <h3 className="text-basic md:text-lg font-semibold break-all  ">
                        Introduction on go
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quam iusto quo est quidem laboriosam ex molestiae
                        tenetur deserunt et harum quod obcaecati esse error a
                        aut, minus ratione, doloremque consectetur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 ">
              <div className="flex flex-col md:flex-row space-x-4 ">
                <div>
                  <img
                    src="/go.png"
                    alt=""
                    className="rounded-lg w-[48rem] h-[14rem] object-cover"
                  />
                </div>
                <div className="my-4">
                  <div className="flex flex-col space-y-2">
                    <div>
                      <p className="text-sm text-gray-700">
                        Sium Hossain, 20 Jan 2023
                      </p>
                    </div>

                    <div>
                      <h3 className="text-basic md:text-lg font-semibold break-all  ">
                        Introduction on go
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quam iusto quo est quidem laboriosam ex molestiae
                        tenetur deserunt et harum quod obcaecati esse error a
                        aut, minus ratione, doloremque consectetur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 ">
              <div className="flex flex-col md:flex-row space-x-4 ">
                <div>
                  <img
                    src="/go.png"
                    alt=""
                    className="rounded-lg w-[48rem] h-[14rem] object-cover"
                  />
                </div>
                <div className="my-4">
                  <div className="flex flex-col space-y-2">
                    <div>
                      <p className="text-sm text-gray-700">
                        Sium Hossain, 20 Jan 2023
                      </p>
                    </div>

                    <div>
                      <h3 className="text-basic md:text-lg font-semibold break-all  ">
                        Introduction on go
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quam iusto quo est quidem laboriosam ex molestiae
                        tenetur deserunt et harum quod obcaecati esse error a
                        aut, minus ratione, doloremque consectetur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* recent */}

        {isLoading ? (
          <div className=" flex justify-center mt-10">
            <Loader />
          </div>
        ) : (
          <div className="py-10">
            {blogsobj?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogsobj?.map((item, index) => (
                  <div className="" key={index}>
                    <Link href={`blog/${item?._id}/`}>
                      <div>
                        <div>
                          <img
                            src={item?.thumbnail}
                            alt=""
                            className="rounded-lg object-cover h-44 w-full"
                          />
                        </div>
                        <div className="my-4">
                          <div className="flex flex-col space-y-2">
                            <div>
                              <p className="text-sm text-gray-700">
                                By {"admin"}{" "}
                                {new Date(item?.createdAt).toLocaleString()}
                              </p>
                            </div>

                            <div>
                              <h2 className="text-basic md:text-lg font-semibold break-all  ">
                                {item?.title}
                              </h2>
                            </div>

                            <div>
                              <p className="text-gray-700 text-justify">
                                {item?.body?.split(0, 1)}...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className=" w-full flex justify-center ">
                <p className="text-gray-300 text-2xl text-center  my-10 w-full ">
                  There is no data found
                </p>
              </div>
            )}
          </div>
        )}

        {/* all blog  */}
      </div>
    </>
  );
}
