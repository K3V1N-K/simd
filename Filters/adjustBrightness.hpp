
#include <vector>

void adjustBrightness(char image1[], int imageWidth, int imageHeight, char modif)
{

    for (int i = 0; i < imageWidth * imageHeight; i++)
    {
        image1[i] = image1[i] *= modif;
    }
}
