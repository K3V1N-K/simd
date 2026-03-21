
#include <vector>
#include <iostream>

void adjustBrightness(char image1[], int imageWidth, int imageHeight, char modif)
{

    for (unsigned int i = 0; i < imageWidth * imageHeight; i++)
    {
        char newPixelValue = image1[i] + modif;
        //std::cout << static_cast<int>(newPixelValue) << " ";
        if(i%100 == 0) {std::system("cls"); 
        std::cout << (0.0 + i) / (imageWidth * imageHeight)*100 << '%';}
        image1[i] = newPixelValue;
    }
}
