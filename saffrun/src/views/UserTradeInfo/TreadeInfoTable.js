import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "تاریخ",
    selector: "date",
    sortable: true,
  },
  {
    name: "تعداد رویدادها",
    selector: "events",
    sortable: true,
  },
  {
    name: "تعداد نوبت ها",
    selector: "reserves",
    sortable: true,
  },
  {
    name: "مبلغ",
    selector: "totalPrice",
    sortable: true,
  },
];

const data = [
  {
    date: "1400/12/25",

    events: "5",
    reserves: "8",
    totalPrice: "8500000",
    details: [
      {
        name: "حسن کریمی",
        time: "12:50",
        price: "250000",
        type: "نوبت",
      },
      {
        name: "حسن کریمی",
        time: "12:50",
        price: "250000",
        type: "نوبت",
      },
      {
        name: "حسن کریمی",
        time: "12:50",
        price: "250000",
        type: "نوبت",
      },
      {
        name: "حسن کریمی",
        time: "12:50",
        price: "250000",
        type: "نوبت",
      },
    ],
  },
  {
    date: "1400/12/25",

    events: "5",
    reserves: "8",
    totalPrice: "8500000",
    details: [
      {
        name: "حسن کریمی",
        time: "12:50",
        price: "250000",
        type: "نوبت",
      },
      {
        name: "حسن کریمی",
        time: "12:50",
        price: "250000",
        type: "نوبت",
      },
      {
        name: "حسن کریمی",
        time: "12:50",
        price: "250000",
        type: "نوبت",
      },
      {
        name: "حسن کریمی",
        time: "12:50",
        price: "250000",
        type: "نوبت",
      },
    ],
  },
  
  // {
  //   date: "14-1096446",
  //   name: "Mireielle Quick",
  //   gender: "Female",
  //   email: "mquick1@mayoclinic.com",
  //   Job_title: "Financial Advisor",
  //   salary: "$2666.37",
  //   address: "410 Hallows Lane",
  //   city: "Wonopringgo",
  // },
  // {
  //   id: "28-9140427",
  //   events: "Blanche Bebbell",
  //   reserves: "Female",
  //   TotalPrice: "bbebbell2@webeden.co.uk",
  //   Job_title: "Desktop Support Technician",
  //   salary: "$7603.07",
  //   address: "5 Hagan Plaza",
  //   city: "Daishan",
  // },
  // {
  //   id: "48-3954041",
  //   name: "Dasha Caddie",
  //   gender: "Female",
  //   email: "dcaddie3@diigo.com",
  //   Job_title: "Software Engineer I",
  //   salary: "$3500.71",
  //   address: "9346 Kinsman Point",
  //   city: "Taesal-li",
  // },
  // {
  //   id: "75-7908803",
  //   name: "Shem Boots",
  //   gender: "Male",
  //   email: "sboots4@toplist.cz",
  //   Job_title: "Research Assistant II",
  //   salary: "$4876.79",
  //   address: "92 Barby Avenue",
  //   city: "Milići",
  // },
  // {
  //   id: "57-8600270",
  //   name: "Dot Karolowski",
  //   gender: "Female",
  //   email: "dkarolowski5@usatoday.com",
  //   Job_title: "Geological Engineer",
  //   salary: "$1277.40",
  //   address: "85519 Debs Avenue",
  //   city: "Zapolyarnyy",
  // },
  // {
  //   id: "96-4074991",
  //   name: "Gino St Leger",
  //   gender: "Male",
  //   email: "gst6@last.fm",
  //   Job_title: "VP Product Management",
  //   salary: "$5411.47",
  //   address: "557 Fieldstone Road",
  //   city: "Niquero",
  // },
  // {
  //   id: "01-7234530",
  //   name: "Jermaine Ricold",
  //   gender: "Female",
  //   email: "jricold7@facebook.com",
  //   Job_title: "Recruiter",
  //   salary: "$6977.39",
  //   address: "367 2nd Park",
  //   city: "Gondar",
  // },
  // {
  //   id: "86-5709443",
  //   name: "Emmott Cicchetto",
  //   gender: "Male",
  //   email: "ecicchetto8@ustream.tv",
  //   Job_title: "Paralegal",
  //   salary: "$1473.46",
  //   address: "7174 Service Court",
  //   city: "Ash Shuhadā’",
  // },
  // {
  //   id: "03-7533373",
  //   name: "Hadleigh Denman",
  //   gender: "Male",
  //   email: "hdenman9@va.gov",
  //   Job_title: "Assistant Media Planner",
  //   salary: "$2170.40",
  //   address: "9 Village Parkway",
  //   city: "Duiwelskloof",
  // },
];

const ExpandableTable = ({ data }) => {
  return (
    <Table className="border border-4 border-secondary rounded-2" responsive striped>
      <thead>
        <tr>
          <th>نام و نام خانوادگی</th>
          <th>نوع</th>
          <th>ساعت</th>
          <th>مبلغ</th>
        </tr>
      </thead>
      <tbody>
        {data.details.map((row, ind) => {
          return (
            <React.Fragment>
              <tr>
                <td>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.time}</td>
                <td>{row.price}</td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

class DataTableExpandableRows extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>تاریخچه تراکنش ها</CardTitle>
        </CardHeader>
        <CardBody>
          <DataTable
            data={data}
            columns={columns}
            noHeader
            expandableRows
            
            expandOnRowClicked
            expandableRowsComponent={<ExpandableTable  />}
          />
        </CardBody>
      </Card>
    );
  }
}

export default DataTableExpandableRows;
