import Link from "next/link";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="global flex h-screen flex-col items-center justify-center gap-y-4">
      <div className="flex w-[250px] flex-col gap-y-4 md:w-[300px] lg:w-[400px]">
        <h2 className="text-2xl md:text-4xl lg:text-6xl">Not Found</h2>
        <p className="text-lg"> The requested resource wasn't found </p>
        <div>
          <Image
            className="mb-4 aspect-[5/5] w-full"
            height="300"
            width="300"
            src="https://reelhub.s3.eu-west-2.amazonaws.com/not-found.jpg"
            alt="not-found"
          />
          <Link href="/dashboard">
            <button className="sm:self-normal w-full self-center rounded-md bg-red p-4 hover:bg-white hover:text-black ">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
