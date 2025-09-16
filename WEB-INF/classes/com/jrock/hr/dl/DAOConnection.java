package com.jrock.hr.dl; 
import java.sql.*;

public class DAOConnection 
{ 
private DAOConnection(){}
public static Connection getConnection()
{
Connection connection = null;
try
{
Class.forName("com.mysql.cj.jdbc.Driver");
 connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/tmdb","tmdbuser","tmdbuser");
}catch(Exception exception)
{
System.out.println(exception.getMessage());
}
return connection;
}
}
