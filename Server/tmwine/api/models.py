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
        return self.품명영

class Review(models.Model):
    리뷰번호 = models.AutoField(primary_key = True)
    와인번호 = models.ForeignKey(
        Wine,
        on_delete=models.CASCADE
    )
    키워드1 = models.IntegerField(default=0)
    키워드2 = models.IntegerField(default=0)
    키워드3 = models.IntegerField(default=0)
    키워드4 = models.IntegerField(default=0)
    키워드5 = models.IntegerField(default=0)
    class Meta:
        db_table = 'Review'