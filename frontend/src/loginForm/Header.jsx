import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-40"
                    src="https://emp.infogen-labs.com/img/logo.png"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-light text-gray-900">
                {heading}
            </h2>
            <p className=" text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-blue-600 hover:text-black">
                {linkName}
            </Link>
            </p>
        </div>
    )
}