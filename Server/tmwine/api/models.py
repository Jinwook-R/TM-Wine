from django.db import models

class Wine(models.Model):
    와인번호 = models.AutoField(primary_key = True)
    품명영문 = models.CharField(max_length=100)
    품명국문 = models.CharField(max_length=100)
    가격 = models.IntegerField(default=0)
    카테고리 = models.CharField(max_length=50)
    생산지 = models.CharField(max_length=50)
    품종 = models.CharField(max_length=500)
    알콜도수 = models.DecimalField(max_digits=4, decimal_places=2)
    당도 = models.IntegerField(default=0)
    산도 = models.IntegerField(default=0)
    바디 = models.IntegerField(default=0)
    타닌 = models.IntegerField(default=0)

    class Meta:
        db_table = 'Wine'

    def __str__(self):
        return self.품명영문

class HotelWine(models.Model):
    보유와인번호 = models.AutoField(primary_key = True)
    와인번호 = models.ForeignKey(
        Wine,
        on_delete=models.CASCADE,
        db_column="와인번호",
    )
    군집 = models.IntegerField(default=0)
    평점 = models.DecimalField(max_digits=6, decimal_places=3)

    class Meta:
        db_table = 'HotelWine'

class Review(models.Model):
    리뷰번호 = models.AutoField(primary_key = True)
    와인번호 = models.ForeignKey(
        HotelWine,
        on_delete=models.CASCADE,
        db_column="와인번호",
    )
    키워드1 = models.IntegerField(default=0)
    키워드2 = models.IntegerField(default=0)
    키워드3 = models.IntegerField(default=0)
    키워드4 = models.IntegerField(default=0)
    키워드5 = models.IntegerField(default=0)
    키워드6 = models.IntegerField(default=0)
    키워드7 = models.IntegerField(default=0)
    키워드8 = models.IntegerField(default=0)
    키워드9 = models.IntegerField(default=0)
    키워드10 = models.IntegerField(default=0)
    키워드11 = models.IntegerField(default=0)
    키워드12 = models.IntegerField(default=0)
    키워드13 = models.IntegerField(default=0)
    키워드14 = models.IntegerField(default=0)
    키워드15 = models.IntegerField(default=0)
    키워드16 = models.IntegerField(default=0)
    키워드17 = models.IntegerField(default=0)
    단어목록 = models.CharField(max_length=200, default='')

    class Meta:
        db_table = 'Review'
