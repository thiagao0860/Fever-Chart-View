# Fever-Chart-View
Repository used to development of a custom Power BI View for dynamic Fever Chart an important tool in Project Management Enviromental (if you need more information please refer to https://tameflow.com/blog/2017-03-30/how-to-draw-buffer-fever-charts/ or take a deep look into TOC and CCPM documentation). 

![Fever-Chart-Result](https://user-images.githubusercontent.com/41775641/120917470-e2072080-c685-11eb-9407-1a2c67c98f2a.PNG)

The View was developed using React inside Power BI as descripted in Microsoft official documentation at https://docs.microsoft.com/en-us/power-bi/developer/visuals/create-react-visual. feel free to fork this project and send feedback, this is a open souce project.

### How to Use:
- For use the visual, you only need to import the visual in Fever-Chart-View/reactFever/dist/ folder and pass activities, %CC(Chain complete) and %PB(Buffer Complete) as showed in image:

![Capturar](https://user-images.githubusercontent.com/41775641/120918141-38c22980-c689-11eb-93c5-f214b6f2c1ab.PNG) 

- Take a Look at example Fever-Chart-View/Fever-Eample.pbix

### Next Steps:
- Insert touch feedback on markers.
- render critical chain as a pop-up in on_click envent on each marker. 
