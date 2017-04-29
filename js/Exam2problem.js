function MenuChoice()
{
      if (document.getElementById("menu").value == "Display Category List")
      {
            document.getElementById("list1").style.visibility = "visible";
            document.getElementById("add2").style.visibility = "hidden";
            document.getElementById("change3").style.visibility = "hidden";
            document.getElementById("delete4").style.visibility = "hidden";
            document.getElementById("about5").style.visibility = "hidden";
            }

      else if (document.getElementById("menu").value == "Add Product Category")
      {
            document.getElementById("list1").style.visibility = "hidden";
            document.getElementById("add2").style.visibility = "visible";
            document.getElementById("change3").style.visibility = "hidden";
            document.getElementById("delete4").style.visibility = "hidden";
            document.getElementById("about5").style.visibility = "hidden";
        }

      else if (document.getElementById("menu").value == "Change Category Description")
      {
            document.getElementById("list1").style.visibility = "hidden";
            document.getElementById("add2").style.visibility = "hidden";
            document.getElementById("change3").style.visibility = "visible";
            document.getElementById("delete4").style.visibility = "hidden";
            document.getElementById("about5").style.visibility = "hidden";
        }

      else if (document.getElementById("menu").value == "Delete Category"){
            document.getElementById("list1").style.visibility = "hidden";
            document.getElementById("add2").style.visibility = "hidden";
            document.getElementById("change3").style.visibility = "hidden";
            document.getElementById("delete4").style.visibility = "visible";
            document.getElementById("about5").style.visibility = "hidden";
        }
      else if (document.getElementById("menu").value == "About Me")
      {
            document.getElementById("list1").style.visibility = "hidden";
            document.getElementById("add2").style.visibility = "hidden";
            document.getElementById("change3").style.visibility = "hidden";
            document.getElementById("delete4").style.visibility = "hidden";
            document.getElementById("about5").style.visibility = "visible";
        }
      else
      {
            document.getElementById("list1").style.visibility = "hidden";
            document.getElementById("add2").style.visibility = "hidden";
            document.getElementById("change3").style.visibility = "hidden";
            document.getElementById("delete4").style.visibility = "hidden";
            document.getElementById("about5").style.visibility = "hidden";
        }
}

/////////////////////////////////List

function CList()
{
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
      
      objRequest.onreadystatechange = function()
      {
            if(objRequest.readyState == 4 && objRequest.status == 200)
            {
                  var output = JSON.parse(objRequest.responseText);
                  GenerateList(output);
            }
      }
      objRequest.open("GET", url, true);
      objRequest.send();
}

function GenerateList(result)
{
      var count = 0;
      var displaytext = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
      
      for(count = 0; count < result.GetAllCategoriesResult.length; count++)
      {
            displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>"+ result.GetAllCategoriesResult[count].CDescription+"</td></tr>";  
      }
      displaytext += "</table>";
      document.getElementById("CategoryList").innerHTML = displaytext;
}


//////////////////ADD

function AddCategory()
{
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";

      var catid =document.getElementById("cname").value;
      var catdescrip =document.getElementById("descrip2").value;

      var newcat = '{"CName":"' + catid + '","CDescription":"' + catdescrip +'"}';

      objRequest.onreadystatechange = function()
      {
             if (objRequest.readyState == 4 && objRequest.status == 200){
                  var result = JSON.parse(objRequest.responseText);
                  if (result.WasSuccessful == 1)
                  {
                        document.getElementById("result2").innerHTML = "The operation was successful!";
                  }
                  else
                  {
                        document.getElementById("result2").innerHTML = "The operation was not successful!";
                  }
            }
      }
        objRequest.open("POST", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send(newcat);
}

////////////////////////////Change

function ChangeDescription()
{
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";

      var catid3 = document.getElementById("cID").value;
      var catdescrip3 = document.getElementById("descrip3").value;


      var update = '{"CID":"' + catid3 + '","CDescription":"' + catdescrip3 +'"}';

      objRequest.onreadystatechange = function()
      {
             if (objRequest.readyState == 4 && objRequest.status == 200)
             {
                  var result = JSON.parse(objRequest.responseText);
                  if (result.WasSuccessful == 1)
                  {
                        document.getElementById("result3").innerHTML = "The operation was successful!";
                  }
                
                   else
                   {
                        document.getElementById("result3").innerHTML = "The operation was not successful!";
                  }
            }           
            }
        objRequest.open("POST", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send(update);
      }



/////////////////////////////////Delete


function DeleteCategory()
{
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
      url += document.getElementById("cID2").value;
      var x = confirm("Are you sure you want to delete this category? This cannot be undone.");


      objRequest.onreadystatechange = function()
      {
             if (objRequest.readyState == 4 && objRequest.status == 200)
             {
                  var result = JSON.parse(objRequest.responseText);
                  if(x === true)
                  {
                        if (result.DeleteCategoryResult.WasSuccessful == 1)
                        {
                              document.getElementById("result4").innerHTML = "The operation was successful!";
                        }
                        else
                        {
                              document.getElementById("result4").innerHTML = "The operation was not successful!" + "<br>" + result.Exception;
                        }
                  }
            }
      }
        objRequest.open("GET", url, true);
        objRequest.send();
      
}













