import React, { useEffect, useState } from "react";
import UserOfficeBoard from "../../components/user-office-board/user-office-board";
import UserOffice from "../../components/user-office/user-office";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux-store/user/selector";
import { documentTitle, privatOficeNavigation } from "../../enums";
import style from "./private-office-page.module.css";

export default function PrivatOfficePage() {
  const userData = useSelector(getUserData);
  const [activeSection, setActiveSection] = useState(privatOficeNavigation.MY_ORDERS);

  useEffect(() => {
    document.title = documentTitle.OFFICE;
  }, [])

  return (
    <div className={style.container}>
      <UserOffice userData={userData} setActiveSection={setActiveSection} activeSection={activeSection}/>
      <UserOfficeBoard activeSection={activeSection}/>
    </div>
  );
}
