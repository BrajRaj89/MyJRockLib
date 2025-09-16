package com.jrock.hr.servlets;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;
import java.util.*;
import com.google.gson.*;
import com.jrock.hr.dl.*;

public class ServletThree extends HttpServlet
{
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
try
{
response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
}catch(Exception e)
{
//do nothing
}
}
public void doPost(HttpServletRequest request ,HttpServletResponse response)
{
try
{
String contentType = request.getContentType();
PrintWriter pw = response.getWriter();
if(contentType!=null && contentType.contains("application/json"))
{
StringBuilder sb = new StringBuilder();
BufferedReader reader = request.getReader();
String line;
while(true)
{
line = reader.readLine();
if(line==null) break;
sb.append(line);
}
String jsonString = sb.toString();
Gson gson = new Gson();
Customer c = gson.fromJson(jsonString,Customer.class);
response.setContentType("application/json");
pw.print(gson.toJson(c));
pw.flush();
}
else
{
String firstName = request.getParameter("firstName");
String lastName = request.getParameter("lastName");
int age = Integer.parseInt(request.getParameter("age"));
response.setContentType("text/plain");
pw.print("FirstName  :"+firstName+","+"LastName :"+lastName+","+"Age :"+age);
pw.flush();
}
}catch(Exception exception)
{
System.out.println(exception.getMessage());
try
{
response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
}catch(Exception e)
{
//do nothing
}
}
}
}