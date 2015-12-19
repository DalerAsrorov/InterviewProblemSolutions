package problem;

import java.util.*;
public class Test {
	public static void main(String [] args) {
		// Test 1. Manual input of points. 
		ArrayList<Point> points = new ArrayList<Point>();
		points.add(new Point(1, 2));
		points.add(new Point(3, 1));
		points.add(new Point(4, 5));
		points.add(new Point(10, 20));
		points.add(new Point(5, 6));
		points.add(new Point(9, 100));
		points.add(new Point(1, 39));
		points.add(new Point(4, 39));
		points.add(new Point(1, 39));
		RowDetection obj = new RowDetection(points); 
		boolean val = obj.detectIfThere(points);
		//System.out.println("True/False?: " + val);
		
		// Test 2. Create random list and test if exists. 
		RowDetection obj2 = new RowDetection();
		obj2.createRandomListOfPoints(20, 50);
		val = obj2.detectIfThere(obj2.getList());
		for (Point p : obj2.getList())
		    System.out.println(p.toString() + ", ");
		System.out.println("\nTrue/False?: " + val);
		
	}
}
