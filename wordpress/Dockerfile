FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && \
    apt install -y apache2 \
                 ghostscript \
                 libapache2-mod-php \
                 mysql-server \
                 php \
                 php-bcmath \
                 php-curl \
                 php-imagick \
                 php-intl \
                 php-json \
                 php-mbstring \
                 php-mysql \
                 php-xml \
                 php-zip

RUN mkdir -p /srv/www/wordpress

COPY . /srv/www/wordpress
COPY wordpress.conf /etc/apache2/sites-available/wordpress.conf
RUN chown -R www-data: /srv/www/
RUN a2ensite wordpress && \
    a2enmod rewrite && \
    a2dissite 000-default && \
    service apache2 restart

ENTRYPOINT ["apachectl", "-D", "FOREGROUND"]
