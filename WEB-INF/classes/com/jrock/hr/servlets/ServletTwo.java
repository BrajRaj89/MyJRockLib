package com.jrock.hr.servlets;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;
import java.util.*;
import com.jrock.hr.dl.*;

public class ServletTwo extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
try
{
response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
}catch(Exception e)
{
//do nothing
}
}
public void doGet(HttpServletRequest request ,HttpServletResponse response)
{
try
{
PrintWriter pw = response.getWriter();
int code = Integer.parseInt(request.getParameter("code"));
response.setContentType("text/plain");
DesignationDAO designationDAO = new DesignationDAO();
try
{
DesignationDTO designation = designationDAO.getByCode(code);
pw.print(designation.getTitle());
}catch(DAOException daoException)
{
pw.print("INVALID");
}
}catch(Exception exception)
{
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