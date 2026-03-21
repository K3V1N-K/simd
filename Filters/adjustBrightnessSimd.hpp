
#include <vector>

void adjustBrightnessSimd(char image1[], int imageWidth, int imageHeight, float modif)
{

    for (int i = 0; i < imageWidth * imageHeight; i++)
    {
        image1[i] = image1[i] *= modif;
    }
}
