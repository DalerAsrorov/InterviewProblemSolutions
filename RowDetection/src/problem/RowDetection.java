package problem;

/*
 * Company: Qualtrics
 * Question: Given the list of points, find if the list contains three adjacent
 * x-coordinates. 
 * 
 */

import java.util.*;
public class RowDetection {
	private ArrayList<Point> points;
	
	public RowDetection() {
		this.points = new ArrayList<Point>(); 
	}
	
	public RowDetection(ArrayList<Point> points) {
		this.points = points;
	}
	
	public void createRandomListOfPoints(int numberOfPoints, int maxRange) {
		Random rngOne = new Random();
		Random rngTwo = new Random();
		for (int i = 0; i < numberOfPoints; i++) {
			int nX = rngOne.nextInt(maxRange) + 1;
			int nY = rngTwo.nextInt(maxRange) + 1;
			this.points.add(new Point(nX, nY));
		}
	}
	
	
	public boolean detectIfThere(ArrayList<Point> points) {
		int counter = 1;
		boolean check = false;
		
		for(int i = 0; i < points.size(); i++) {
			Point p = points.get(i);
			for(int j = 0; j < points.size(); j++) {
				if (i != j) {
					if(p.getX() == points.get(j).getX()) {
						counter++; 
						if(counter == 3) {
							check = true;
							return check;
						}
					}
					
				}
			}
			counter = 0; 
		}
		
		return check;
	}
	
	public ArrayList<Point> getList () {
		return this.points;
	}
	
}
