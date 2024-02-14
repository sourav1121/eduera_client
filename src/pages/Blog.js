import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function Blog() {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Fragment>
      <Accordion open={open === 1}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          What is Cors?
        </AccordionHeader>
        <AccordionBody className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          Cross-origin resource sharing is a mechanism that allows restricted
          resources on a web page to be requested from another domain outside
          the domain from which the first resource was served. A web page may
          freely embed cross-origin images, stylesheets, scripts, iframes, and
          videos.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Why are you using firebase? What other options do you have to
          implement authentication?
        </AccordionHeader>
        <AccordionBody className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          I would manually make function and validate and then insert into
          database, to authenticate and for authorization, I would use
          react-context to pass the authentication, also use react reducers, Or
          I would use Redux React's context allows you to share information to
          any component, by storing it in a central place and allowing access to
          any component that requests it (usually you are only able to pass data
          from parent to child via props).
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          How does the private route work?
        </AccordionHeader>
        <AccordionBody className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          The react private route component renders child components ( children
          ) if the user is logged in. If not logged in the user is redirected to
          the /login page with the return url passed in the location state
          property.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4}>
        <AccordionHeader
          onClick={() => handleOpen(4)}
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          What is Node? How does Node work?
        </AccordionHeader>
        <AccordionBody className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          It is a used as backend service where javascript works on the
          server-side of the application. This way javascript is used on both
          frontend and backend. Node. js runs on chrome v8 engine which converts
          javascript code into machine code, it is highly scalable, lightweight,
          fast, and data-intensive
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}
