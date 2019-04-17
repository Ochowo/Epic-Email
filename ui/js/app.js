
// const unRead = () => {
//   const token = window.localStorage.getItem('x-access-token');
//   fetch('http://127.0.0.1:8000/api/v1/messages/unread', {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': token,
//     },
//   })
//     .then(res => res.json())
//     .then((resp) => {
//       console.log(resp);
//       const inb = document.querySelector('#mvv');
//       if (resp.status === 200) {
//         let table = '';
//         const arrayOfmessages = resp.data.unread;

//         table += `
//           <tr>
//           <th><input type="checkbox" name="check" value="check" class="check"></th>
//           <th></th> 
//           <th>Message</th> 
//           <th><i class="fa fa-trash-o del"></i>&nbsp;&nbsp;&nbsp; Delete</th> 
//           <th><i class="fa fa-calendar cal"></i>&nbsp;&nbsp;&nbsp; Date </th> 
    
//         </tr>`;
//         arrayOfmessages.forEach((msg) => {
//           console.log(msg);
//           table += `
//           <tr class="unread">
//             <td><input type="checkbox" name="check" value="select" class="check"></td>
//             <td>${msg.sfirstname} ${msg.slastname}</td>
//             <td class="ellip">
//                 <div class="subject">${msg.subject}</div>
//                 ${msg.message}
//             </td>
//             <td><i class="fa fa-trash-o del"></i></td>
//             <td>${msg.createdon}</td> 
//           </tr>
//             `;
//         });
//         document.getElementById('tbl').innerHTML = table;
//       } else if (resp.status === 404) {
//         inb.innerHTML = 0;
//         document.getElementById('tbl').style.textAlign = 'center';
//         document.getElementById('tbl').style.paddingTop = '5%';
//         document.getElementById('tbl').innerHTML = 'Your inbox is empty';
//       } else if (resp.status === 500) {
//         inb.innerHTML = 0;
//         document.getElementById('tbl').style.textAlign = 'center';
//         document.getElementById('tbl').style.paddingTop = '5%';
//         document.getElementById('tbl').innerHTML = 'An error occured while getting your inbox.';
//       }
//     });
// };
// document.querySelector('.unr').addEventListener('click', unRead);
// const sentMsg = () => {
//   const token = window.localStorage.getItem('x-access-token');
//   fetch('http://127.0.0.1:8000/api/v1/messages/sent', {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': token,
//     },
//   })
//     .then(res => res.json())
//     .then((resp) => {
//       console.log(resp);
//       const inb = document.querySelector('#mvvp');
//       if (resp.status === 200) {
//         let table = '';
//         const arrayOfmessages = resp.data.sent;

//         table += `
//           <tr>
//           <th><input type="checkbox" name="check" value="check" class="check"></th>
//           <th></th> 
//           <th>Message</th> 
//           <th><i class="fa fa-trash-o del"></i>&nbsp;&nbsp;&nbsp; Delete</th> 
//           <th><i class="fa fa-calendar cal"></i>&nbsp;&nbsp;&nbsp; Date </th> 
    
//         </tr>`;
//         arrayOfmessages.forEach((msg) => {
//           console.log(msg);
//           table += `
//           <tr class="unread">
//             <td><input type="checkbox" name="check" value="select" class="check"></td>
//             <td>${msg.rusername} ${msg.ruserlastname}</td>
//             <td class="ellip">
//                 <div class="subject">${msg.subject}</div>
//                 ${msg.message}
//             </td>
//             <td><i class="fa fa-trash-o del"></i></td>
//             <td>${msg.createdon}</td> 
//           </tr>
//             `;
//         });
//         document.getElementById('tbl').innerHTML = table;
//         singleMsg ();
//       } else if (resp.status === 404) {
//         inb.innerHTML = 0;
//         document.getElementById('tbl').style.textAlign = 'center';
//         document.getElementById('tbl').style.paddingTop = '5%';
//         document.getElementById('tbl').innerHTML = 'Your inbox is empty';
//       } else if (resp.status === 500) {
//         inb.innerHTML = 0;
//         document.getElementById('tbl').style.textAlign = 'center';
//         document.getElementById('tbl').style.paddingTop = '5%';
//         document.getElementById('tbl').innerHTML = 'An error occured while getting your inbox.';
//       }
//     });
// };
// document.querySelector('.seent').addEventListener('click', sentMsg);
