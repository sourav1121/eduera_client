import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function FAQ() {
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
          What do Eduera courses include?
        </AccordionHeader>
        <AccordionBody className="text-white p-5 font-normal text-base border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ">
          Each Eduera course is created, owned and managed by the instructor(s).
          The foundation of each Eduera course are its lectures, which can
          include videos, slides, and text. In addition, instructors can add
          resources and various types of practice activities, as a way to
          enhance the learning experience of students.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          How do I take a Eduera course?
        </AccordionHeader>
        <AccordionBody className="text-white p-5 font-normal text-base border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          Eduera courses are entirely on-demand and they can be accessed from
          several different devices and platforms, including a desktop, laptop,
          and our mobile app. After you enroll in a course, you can access it by
          clicking on the course link you will receive in your confirmation
          email (provided you’re logged into your Eduera account). You can also
          begin the course by logging in and navigating to your My learning page
          (which is not implemented yet :P).
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Is there any way to preview a course?
        </AccordionHeader>
        <AccordionBody className="text-white p-5 font-normal text-base border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          Yes! you can access it by clicking on the course link and preview the
          information regarding that course :)
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}
